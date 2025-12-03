# 🌱 Welcome to MyPlants.io, a plant collection app based on my own REST API!
MyPlants.io is designed for you to collect your plants, post new ones on the universal repository, and find other plant-loving users.

- Take a look at MyPlants.io's frontend deployment [here](https://myplantsdotio.vercel.app/).
- The backend endpoints are deployed [here](https://myplants-backend.onrender.com/).

## 🌿 About the Project
MyPlants.io allows plant enthusiasts to manage their plant collections, see other users, and share their botanical treasures. It is based on:

1. A RESTful API built with ``Node.js`` and ``Express`` that provides full CRUD functionality, plus secure authentication and authorization
2. A web app built with ``React`` and ``Typescript``

## 🛠️ Tech Stack & Libraries

## BACKEND:

- Runtime: ``Node.js`` with ``nodemon`` to expedite development
- Framework: ``Express.js``
- Database: ``MongoDB``, managed from ``MongoAtlas`` 
- Authentication: ``JWT``, served via cookies
- Password hashing: ``bcrypt``
- Cloud storage (for user and plant pictures): ``supabase``
- File upload: ``multer``
- Deployment: ``Render``
- Testing: For version 1.0.0, testing is manual

## FRONTEND:

- Framework: ``React`` + ``TypeScript`` 
- Styling: ``TailwindCSS``, with integration via ``@tailwindcss/vite`` 
- Routing: ``react-router-dom``
- Forms and validation: ``react-hook-form`` and ``zod``
- HTTP requests: ``axios``
- Scroll loaders: ``lodash``
- Animations: ``gsap``
- Bundler: ``Vite``
- Deployment: ``Vercel``

## 📦 Installation & Setup

## IMPORTANT: Since MyPlants.io's backend is deployed on a free instance of ``Render``, you will either have to wait up to 30 seconds for the first request to complete, or you can pre-wake the instance by loading it [here](https://myplants-backend.onrender.com/).

## BACKEND:

### 1. Clone the repository:

```bash
git clone https://github.com/ori0nis/proyecto-fullstack-backend
cd proyecto-1-backend
```
### 2. Install dependencies

```bash
npm install
```
### 3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

## FRONTEND:

### 1. Clone the repository:

```bash
git clone https://github.com/ori0nis/proyecto-fullstack-frontend
cd proyecto-fullstack-frontend
```
### 2. Install dependencies

```bash
npm install
```
### 3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```
### 4. Run the development server

```bash
npm run dev
```
### 5. Build for production

```bash
npm run build
```

## 📋 API Features
- User management
- User registration and profile creation
- User login with ``JWT`` authentication
- User profile viewing and editing
- Secure password storage with ``bcrypt`` hashing

## 👔 Plant Management
- Create your personal plant entries with your own images
- View all plants in the repository, or filter them by common name, scientific name and type
- Request to add a new plant to the repository

## 📋 UI Features
- Login and register landing pages to create or log in to your account 
- Internal dashboard features a clear, botanical card-style design
- Seamless navigation thanks to SPA build

## 📱 Social Features
- Browse other plant enthusiasts
- View other users' plant collections

## 🔐 Authentication System
- Backend hashes passwords using ``bcrypt``
- Frontend ``axios`` interceptor checks each request to validate token, using a validation endpoint:

```ts 
API.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;
    const publicRequest =
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/register") ||
      originalRequest.url?.includes("/refresh");

    // If request is public, don't throw 401
    if (publicRequest) return Promise.reject(error);

    // If 401 is received and user isn't trying to refresh
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint
        await refreshToken();
        // Retry original request
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid");
        await handleLogout();
        return Promise.reject(refreshError);
      }
    }

    // If it wasn't a 401 or refresh failed, return original error
    return Promise.reject(error);
  }
);
```

