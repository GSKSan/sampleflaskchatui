from flask import Flask, render_template, after_this_request, jsonify, request
import sys

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/hello', methods=['GET'])
def hello():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    jsonResp = {'reply':'Hello! how are you'}
    print(jsonResp)
    return jsonify(jsonResp)

@app.route("/getmessage", methods=["GET", "POST"])
def my_function():
    if request.method == "POST":
        data = {}
        data['msg'] = request.json['msg']


        print(data, file=sys.stderr)

        return jsonify(data)
    else:
        return render_template('the_page_i_was_on.html')


if __name__ == '__main__':
    app.run()
