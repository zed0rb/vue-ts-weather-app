# Vue TS Weather App

A **single-page weather application** built with **Vue 3 + TypeScript + Vite** using the **OpenWeatherMap Current Weather API**.
Users can add forecasts by **City, ZIP, or Coordinates**, filter results, paginate them (10 per page), and store them in **LocalStorage**. Success and error notifications are shown for all actions. The app auto-refreshes every 5 minutes. 

---

## Features

* Vue 3 + TypeScript + Vite
* Bulma UI for minimal styling
* Add forecasts by **City / ZIP / Coordinates**
* Remove forecasts individually
* Filter forecasts with search input
* Pagination: **10 items per page**
* LocalStorage persistence and auto-restore
* Toast notifications for success and errors
* Axios for API calls
* Auto-refresh forecasts every 5 minutes (configurable)
* OpenWeather icons displayed for each forecast

---

## Setup

1. **Clone the repository**:

```bash
git clone <repo-url>
cd <repo-folder>
```

2. **Install dependencies**:

```bash
npm install
```

3. **Create `.env` file** with your OpenWeatherMap API key:

```bash
VITE_OWM_API_KEY=your_api_key_here
```

You can get a free API key at [OpenWeatherMap](https://openweathermap.org/api).

4. **Run the development server**:

```bash
npm run dev
```

5. **Build for production**:

```bash
npm run build
```

6. **Serve the production build** (optional, using http-server):

```bash
npm run serve
```

Your app will be available at `http://localhost:5173`.

---

## Configuration

* **Pagination size**: Change `PAGE_SIZE` in `App.vue` (default: 10).
* **Auto-refresh interval**: Change `REFRESH_MS` in `App.vue` (default: 5 minutes).
* **Weather icons**: Loaded from OpenWeatherMap:

```
https://openweathermap.org/img/wn/{icon}@2x.png
```

---

## Folder Structure

```
├─ src
│  ├─ components
│  │  ├─ AddForecastModal.vue
│  │  ├─ ForecastCard.vue
│  │  ├─ ForecastList.vue
│  │  ├─ HeaderBar.vue
│  │  └─ ToastStack.vue
│  ├─ composables
│  │  ├─ useForecasts.ts
│  │  ├─ useLocalStorage.ts
│  │  └─ useToasts.ts
│  ├─ services
│  │  └─ weather.ts
│  ├─ types.ts
│  ├─ App.vue
│  └─ main.ts
├─ index.html
├─ vite.config.ts
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

## Dependencies

* Vue 3
* TypeScript
* Vite
* Bulma
* Axios
* Material Design Icons
* ESLint & Prettier for code quality and formatting
