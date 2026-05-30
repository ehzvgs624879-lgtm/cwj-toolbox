import os
from flask import Flask, render_template_string, request
import requests

app = Flask(__name__)

HTML = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>天气工具</title>
    <style>
        body { font-family: Arial; text-align: center; padding: 30px; }
        button {
            padding: 12px 20px;
            font-size: 18px;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
        }
        input {
            padding: 10px;
            font-size: 16px;
            width: 200px;
        }
        .box {
            margin-top: 20px;
            background: #f5f5f5;
            padding: 15px;
            border-radius: 10px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>

<h2>🌦️ 天气查询工具</h2>

<form method="post">
    <input name="city" placeholder="输入城市，例如 Taipei">
    <button type="submit">查询</button>
</form>

<div class="box">
{% if result %}
{{ result }}
{% endif %}
</div>

</body>
</html>
"""

def get_weather(city):
    url = f"https://wttr.in/{city}?format=3"
    try:
        resp = requests.get(url, timeout=10)
        return resp.text
    except Exception as e:
        return f"查询失败：{e}"


@app.route("/", methods=["GET", "POST"])
def index():
    result = ""

    if request.method == "POST":
        city = request.form.get("city", "").strip()
        if city:
            result = get_weather(city)
        else:
            result = "请输入城市名称"

    return render_template_string(HTML, result=result)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
