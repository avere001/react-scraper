Web Scraper and API
===============
Gets the raw HTML of any site.

## Running
This requires Python 3.8 or greater and Pipenv. 
Older Python 3 versions may work but have not been tested. 

- Install the dependencies with `pipenv install --ignore-pipfile`.
- Activate the virtual environment with `pipenv shell`
- Start the server with `python3 app.py`

The server will launch on port 5000 and can be accessed at http://localhost:5000/.
The web interface will let you interactively enter URLs to get their raw HTML.
You can view the API docs at http://localhost:5000/swagger.

## API Usage
Submit a GET request to `/website` and pass the URL in the `url` query parameter.

Example request for github.com:

`$ curl "http://localhost:5000/website?url=http%3A%2F%2Fgithub.com"`

More details can be found in the Swagger docs on the swagger docs at `/swagger` on the website.
