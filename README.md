# Generic reverse proxy
Helps you to configure your own proxy. 
It has 3 components. 

1. Outer webpack / vercel proxy
1. A backend server
1. A frontend

## How to use

* Open home page (for local -> localhost:3000)
* Add a backend
* Activate it
* You can also share the installation links to your friends

## How does it work?

The outer proxy routes between frontend/backend. 
Frontend helps to build a "proxy backend" (a target url, some headers and some cookies).
After building, it lets you install on browser and activate it.
While activating it will use backend to save the "proxy backend" as a hidden, httponly cookie. 
This cookie will be used afterwards for proxying all requests. 
