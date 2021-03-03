import asyncio
import re
from pathlib import Path

import httpx

URLS = [
    'https://github.com/',
    'https://google.com/',
    'https://amazon.com/',
]


async def download_website(client, url):
    """Download the website and save it to a file."""
    try:
        response = await client.get(url)
    except httpx.RequestError as exc:
        print(f"An error occurred while requesting {exc.request.url}. The site cannot be downloaded.")
        return

    file_name = ''.join(url.split('//')[1:])  # drop the protocol
    file_name = re.sub(r'[^a-zA-Z0-9_\-.]', '', file_name)  # drop unsafe characters
    file_name = f'{file_name}.html'

    Path(file_name).write_text(response.text)


async def download_websites(urls):
    """    Download the websites and save them to files."""
    async with httpx.AsyncClient() as client:
        coros = [download_website(client, url) for url in urls]
        await asyncio.gather(*coros)


def main():
    asyncio.run(download_websites(URLS))


if __name__ == '__main__':
    main()
