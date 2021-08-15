from flask import Flask, render_template

app = Flask(__name__, static_folder='front/build/static', template_folder='front/build')

@app.route("/")
def hello_world():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)