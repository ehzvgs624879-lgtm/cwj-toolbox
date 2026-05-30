from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# ===== 爬虫函数（抓网页标题）=====
def crawl_title(url):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    res = requests.get(url, headers=headers, timeout=10)
    soup = BeautifulSoup(res.text, "html.parser")

    title = soup.title.text.strip() if soup.title else "无标题"
    return title


# ===== 天气接口（免费API）=====
def get_weather(city):
    url = f"https://wttr.in/{city}?format=j1"
    res = requests.get(url).json()

    current = res["current_condition"][0]

    return {
        "city": city,
        "temp": current["temp_C"],
        "desc": current["weatherDesc"][0]["value"]
    }


# ===== 网站接口：爬虫 =====
@app.route("/crawl")
def crawl():
    url = request.args.get("url")

    if not url:
        return jsonify({"error": "请传URL"})

    try:
        title = crawl_title(url)
        return jsonify({
            "url": url,
            "title": title
        })
    except Exception as e:
        return jsonify({"error": str(e)})


# ===== 网站接口：天气 =====
@app.route("/weather")
def weather():
    city = request.args.get("city", "Beijing")

    try:
        data = get_weather(city)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)})


# ===== 前端页面 =====
@app.route("/")
def home():
    return """
<!DOCTYPE html>
<html>
<head>
    <title>我的工具网站</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        input { padding: 8px; width: 250px; margin: 5px; }
        button { padding: 8px 12px; margin: 5px; }
        .box { margin-top: 20px; padding: 10px; border: 1px solid #ccc; }
    </style>
</head>
<body>

<h1>🌐 工具网站（天气 + 爬虫）</h1>

<h3>🌦 天气查询</h3>
<input id="city" placeholder="输入城市">
<button onclick="getWeather()">查询天气</button>
<div id="weather" class="box"></div>

<h3>🕷 网页爬虫</h3>
<input id="url" placeholder="输入网址">
<button onclick="crawl()">抓取标题</button>
<div id="crawl" class="box"></div>

<script>
function getWeather(){
    let city = document.getElementById("city").value;
    fetch("/weather?city=" + city)
    .then(r => r.json())
    .then(data => {
        document.getElementById("weather").innerText =
        "城市: " + data.city +
        "\\n温度: " + data.temp + "°C" +
        "\\n天气: " + data.desc;
    });
}

function crawl(){
    let url = document.getElementById("url").value;
    fetch("/crawl?url=" + url)
    .then(r => r.json())
    .then(data => {
        document.getElementById("crawl").innerText =
        JSON.stringify(data, null, 2);
    });
}
</script>

</body>
</html>
"""


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
