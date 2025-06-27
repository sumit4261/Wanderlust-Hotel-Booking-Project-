# Wanderlust Hotel Booking Web App

Wanderlust is a full-stack hotel and property booking platform inspired by Airbnb. Users can browse, search, and book listings, leave reviews, and manage their own properties. The app features authentication, image uploads, map integration, and a modern, mobile-friendly UI.

## Features
- User authentication and session management
- Add, edit, and delete property listings with images
- Search and filter listings
- Leave and manage reviews
- Mapbox integration for location display
- Responsive, mobile-first design with horizontal card scrolling on mobile
- Cloudinary integration for image storage
- Flash messages and error handling

## Tech Stack
- Node.js, Express, MongoDB (Atlas), Mongoose
- EJS, Bootstrap 5, Passport.js
- Cloudinary, Mapbox

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm
- MongoDB Atlas account
- Cloudinary account (for image uploads)
- Mapbox account (for maps)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/Wanderlust-Hotel-Booking-Project.git
   cd Wanderlust-Hotel-Booking-Project
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory with the following:
     ```env
     CLOUD_NAME=your_cloudinary_cloud_name
     API_KEY=your_cloudinary_api_key
     API_SECRET=your_cloudinary_api_secret
     MAP_TOKEN=your_mapbox_token
     ATLASDB_URL=your_mongodb_atlas_connection_string
     SECRET=your_session_secret
     ```

### Running the App Locally
```sh
npm start
```
- The app will run on [http://localhost:8080](http://localhost:8080)

### Seeding the Database (Optional)
To seed the database with initial listings:
```sh
node init/index.js
```

### Deployment
- Deploy to platforms like Render, Heroku, or AWS.
- Set all environment variables in your deployment dashboard (do not upload `.env`).
- Whitelist your deployment server's IP in MongoDB Atlas.

## License
This project is licensed under the MIT License.

---

**Enjoy using Wanderlust!**
