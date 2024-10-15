# APakr Hosting

This is a fully fledged hosting solution for [gmsv_apakr_plugin](https://github.com/A5R13L/gmsv_apakr_plugin/tree/main/source/apakr).

## Deploy your own

<details>
  <summary><h3>Cloudflare Workers :cloud:</h3></summary>
  <br>

  To deploy to `Cloudflare Workers`, use the button and follow the instructions below.

  [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button?paid=true)](https://deploy.workers.cloudflare.com/?url=https://github.com/A5R13L/apakr-hosting&paid=true)

  ## When it asks you to make an API Token, ensure you select "Edit Cloudflare Workers" template:
  ![image](https://github.com/user-attachments/assets/dbd0a7fc-6c56-4bef-8123-3181e0fed8cd)

  ## In the API Token, set "Account Resources" and "Zone Resources" to "All accounts" and "All zones" respectively:
  ![image](https://github.com/user-attachments/assets/26f23400-3247-492e-87c9-f8a4b41ba702)

  ## Click "Continue to summary"
  ![image](https://github.com/user-attachments/assets/8a4c665a-7791-4075-aaaa-7eb153bcb788)

  ## Click "Create Token"
  ![image](https://github.com/user-attachments/assets/7e3ac7a8-dc0a-4184-97b1-124ab37e2fd9)

  ## Copy the API Token and put it in the setup page
  ![image](https://github.com/user-attachments/assets/bf390e81-d7e6-4223-a1ef-f5ba9d9544d9)
  ![image](https://github.com/user-attachments/assets/d6848f0f-cf3a-4b4a-8eeb-1454fdd774e3)

  ## If you struggle to find your Account ID, try using the article below as a reference:
  https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/
  > You may also need to create a blank worker to have it show the details if you do not have any domains set-up.
</details>

<details>
  <summary><h3>Deno Deploy :sauropod:<h3></summary>
  <br>

  To deploy to `Deno Deploy`, follow the instructions below.

  ## Create a fork of this repository.
  ![image](https://github.com/user-attachments/assets/58d33bce-9730-4c9f-ab28-afec3151aedd)

  ## Visit https://dash.deno.com/ and sign-in.
  ![image](https://github.com/user-attachments/assets/6ac91794-5482-4d5f-9daa-5361c062cb7b)

  ## Click "Deploy From Github"
  ![image](https://github.com/user-attachments/assets/896a64d6-ff7a-495a-843c-0e3b2136654a)

  ## Select your account, and select the repository named `apakr-hosting`.
  ![image](https://github.com/user-attachments/assets/9af5cfc6-b640-4897-8c9b-9df25f5e7800)

  ## For `Install Step`, enter "yarn".
  ![image](https://github.com/user-attachments/assets/782aef36-616e-4a01-801e-9b6d3dac68e4)

  ## For `Build Step`, leave it blank.
  ![image](https://github.com/user-attachments/assets/9087f60e-e270-4603-8fba-4adee88ef461)

  ## For `Root Directory`, enter ".".
  ![image](https://github.com/user-attachments/assets/0f6242e8-16d3-4468-95d5-ae9c14b5a701)

  ## For `Entrypoint`, enter "src/deno.ts".
  ![image](https://github.com/user-attachments/assets/b2beac1c-03bd-42eb-9d48-b21364e60feb)

  ## Click "Deploy Project".
  ![image](https://github.com/user-attachments/assets/318d9f59-da20-47bd-a0bb-799e2392d107)
</details>

<details>
  <summary><h3>Docker (Self-Hosted) :ship:</h3></summary>
  <br>

  The included `docker-compose.yml` has everything you need to create a container. All you need is [Docker Compose](https://docs.docker.com/compose/install/).

  Once you have cloned the repository, run the following code to build and start the container:
  ```bash
    docker compose up -d --build
  ```

  The server will be available at `127.0.0.1:9660` as well as `0.0.0.0:9660`.

  The listening address as well as port can both be changed in the `.env` file.
  If you are running the server behind a reverse proxy, the `DENO_HOST` address should be `127.0.0.1`.
</details>

<details>
  <summary><h3>Other :question:</h3></summary>
  <br>

  You can also use any other type of hosting platform, as long as you use [Deno](https://docs.deno.com/runtime/getting_started/installation/) to run the server.
  The command to run the server would be:
  ```bash
    deno run -A src/deno.ts
  ```
</details>
