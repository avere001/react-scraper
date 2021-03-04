from flask import Flask
from flask_restx import Resource, Api, reqparse, inputs, fields

app = Flask(__name__)
api = Api(app)

# Get rid of field mask parameter in documentation
app.config['RESTX_MASK_SWAGGER'] = False

website_response_model = api.model('WebsiteResponse', {
    'content': fields.String,
    'url': fields.Url
})

website_request_parser = reqparse.RequestParser()
website_request_parser.add_argument('url', type=inputs.url, required=True)


class WebsiteResponseData(object):
    def __init__(self, url, content):
        self.url = url
        self.content = content


@api.route('/website')
class Website(Resource):

    @api.marshal_with(website_response_model)
    @api.expect(website_request_parser, validate=True)
    def get(self):
        args = website_request_parser.parse_args()
        return WebsiteResponseData(
            url=args['url'], content='<h1>WOW</h1>')


api.add_resource(Website, '/website')


if __name__ == '__main__':
    app.run()
