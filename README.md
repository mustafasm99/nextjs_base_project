# Next.js Starter Template (Axios • TanStack Query • Redux • i18n • Shadcn/UI)

This project is a **clean, scalable boilerplate** built with modern tools and best practices for Next.js 14+ apps. It’s designed to help you start fast, write maintainable code, and scale your app without clutter.

---

## 🚀 Tech Stack

| Tool | Purpose |
|------|----------|
| **Next.js 14+ (App Router)** | React framework for server and client rendering |
| **Axios** | HTTP client for API communication |
| **TanStack Query (React Query)** | Data fetching, caching, and background updates |
| **Redux Toolkit** | Global client-side state management |
| **i18next** | Multi-language support (JSON-based translation files) |
| **shadcn/ui + Sonner** | Beautiful UI components & toast notifications |
| **TypeScript** | Type-safe code everywhere |

---

## 📦 Project Setup

### 1️⃣ Clone & Install

```bash
git clone https://github.com/your-username/nextjs-starter-template.git
cd nextjs-starter-template
npm install
```

### 2️⃣ Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## 🧩 Project Structure

```
src/
 ├── app/                     # Next.js App Router
 ├── hooks/                   # Custom React hooks
 │   └── useLanguage.ts       # Handles language state and direction
 ├── lib/
 │   ├── axios-client-instance.ts   # Axios instance with interceptors
 │   ├── api-client.ts              # Generic API methods (GET, POST, PUT, DELETE)
 │   ├── i18n/                      # i18n configuration
 │   │   ├── index.ts
 │   │   ├── settings.ts
 │   │   ├── locales/
 │   │   │   ├── en.json
 │   │   │   └── ar.json
 ├── store/                   # Redux Toolkit slices
 └── components/              # UI components (shadcn + custom)
```

---

## 🌍 Localization (i18n)

Translations are stored as simple JSON files:

**`/src/lib/i18n/locales/en.json`**
```json
{
  "hello": "Hello World",
  "welcome": "Welcome to our app"
}
```

**Usage in Components:**
```tsx
import { useTranslation } from "react-i18next";

export default function Welcome() {
  const { t } = useTranslation();
  return <h1>{t("welcome")}</h1>;
}
```

### Language Hook
You can switch languages easily using the custom `useLanguage` hook:
```tsx
import { useLanguage } from "@/hooks/useLanguage";

const { currentLang, changeLanguage, isRTL } = useLanguage();

<button onClick={() => changeLanguage("ar")}>AR</button>
<button onClick={() => changeLanguage("en")}>EN</button>
```

---

## 🌐 Axios API Client

Centralized Axios setup for consistent headers and token handling.

**`/src/lib/axios-client-instance.ts`**
- Adds `Authorization` headers automatically (reads from `localStorage`)
- Handles `401 Unauthorized` with a Sonner toast notification

**`/src/lib/api-client.ts`**
Provides clean methods for requests:
```ts
apiClient.get("/users");
apiClient.post("/login", { email, password });
apiClient.upload("/images", formData); // handles FormData automatically
```

---

## ⚡️ TanStack Query (React Query)

For data fetching, caching, and background refetching:

```tsx
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: () => apiClient.get("/users"),
});
```

Add the provider in your root layout:
```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  {children}
</QueryClientProvider>
```

---

## 🧠 Redux Toolkit (Global State)

Keep local app state (like UI preferences, user session, etc.) separate from server data.

Example slice:
```ts
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
```

---

## 🎨 Shadcn + Sonner Integration

- Use [shadcn/ui](https://ui.shadcn.com) components for consistent design
- Use `sonner` for toast notifications:

```tsx
import { toast } from "sonner";

toast.success("Saved successfully!");
toast.error("Something went wrong");
```

---

## 🧰 Development Commands

| Command | Description |
|----------|--------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

---

## 💡 Why This Setup

This structure helps you:
- Build **faster and cleaner Next.js apps**
- Keep your code **modular and reusable**
- Use a **consistent API layer** across the app
- Support **multi-language UI** out of the box
- Scale easily with **React Query and Redux**

---

## 🏁 Quick Start Example

```tsx
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { useLanguage } from "@/hooks/useLanguage";

export default function Dashboard() {
  const { currentLang } = useLanguage();
  const { data: users } = useQuery({
    queryKey: ["users", currentLang],
    queryFn: () => apiClient.get("/users"),
  });

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
```

---

## 🧩 Future Enhancements

- Add `refreshToken` support for Axios
- Integrate dark/light mode toggle in Redux
- Add server-side translations (optional)
- Add unit tests using Vitest or Jest

