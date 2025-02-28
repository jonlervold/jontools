# jontools

## Overview

**jontools** is a collection of various coding projects I've built that serve practical, experimental, or fun purposes. Each tool found here came about either from facing a problem where no existing solution quite fit my needs or simply because I thought it would be interesting to create.

## Live

[https://jontools.net](https://jontools.net)

## Current Features

- **MIDI Inverter**
  - **Description:** Invert the pitches of  MIDI files while maintaining the original register and harmony.
  - **Key Capabilities:**
    - Transforms each MIDI note to its mirror image.
    - Preserves the overall musical structure, including key changes and modal interchange, except inverted.
    - Includes an octave-matching function to maintain track registers.

- **MIDI Transformer**
  - **Description:** Apply custom transformations to MIDI files, allowing for complex musical alterations.
  - **Key Capabilities:**
    - Supports a wide range of modal transformations based on user-defined parameters.
    - Facilitates both automatic and manual transformation selection for precise control.

## Technologies Used

- **General:**
  - Docker
  - Docker Compose

- **Frontend:**
  - React
  - TypeScript
  - Vite
  - Nginx

- **Backend:**
  - Flask
  - Python
  - Gunicorn

- **SSL:**
  - LetsEncrypt
  - Certbot

- **Deployment:**
  - Shell Scripting

## Architecture

The frontend is built with React and TypeScript to create a seamless and interactive user experience. The backend, powered by Flask (Python), handles file processing. Docker is utilized to containerize the frontend, backend, and SSL certificate renewal (Certbot) services, facilitating easy deployment and scalability. Content is served through Nginx.

## Contact

I can be reached at [jonlervold@gmail.com](mailto:jonlervold@gmail.com).

Visit my homepage at [https://jonlervold.com](https://jonlervold.com).

## Bug Reports

If you encounter anything not working as expected, please [open an issue on the project's GitHub](https://github.com/).

(JT-2 - Change to correct link)

## License

jontools - Copyright (C) 2025 Jon Lervold

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

The full text of the license can be found in the LICENSE.md file.
