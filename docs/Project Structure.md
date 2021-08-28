# Project Structure

## 1. Tổng quan

- Project được chia làm 2 phần chính `/src/app` và `/src/core`

```
src
├───app    // Chứa các thành phần chỉ dùng cho app hiện tại
└───core   // Chứa các thành phần dùng chung, có thể cho nhiều app khác.
```

- Trong `/src/app` sẽ chứa:

```
app
├───apis
├───assets
├───components
│   ├───buttons
│   ├───cards
│   └───layouts
├───i18n
├───modules
│   ├───admin-module
│   │   └───pages
│   │       ├───dashboard
│   │       └───statistics
│   └───main-module
│       └───pages
│           ├───about
│           └───home
├───shared
│   ├───const
│   ├───helpers
│   ├───types
│   └───services
├───store
│   ├───reducer-1
│   └───reducer-2
└───styles
        _reset.scss
        app.scss
```

## 2. Tạo màn hình

### 2.1. App có nhiều layout.

- Thường một số màn hình sẽ có layout chung, cần tạo riêng module cho layout đó.
- Mỗi trang thuộc module/layout đó sẽ được để trong một thư mục riêng ở dưới `/pages` của module.

```
app
└───modules
    └───module-1
        └───pages
            └───page-1
                    index.ts
                    page-1.component.tsx
                    page-1.component.scss
```

- Nếu page có sub-pages, tạo thêm thư mục `/sub-pages`

```
page-1
│   index.ts
│   page-1.component.tsx
│
└───sub-pages
    ├───page-1.1
    └───page-1.2
```

### 2.2. Trường hợp app chỉ có 1 layout.

- Không phải chia nhiều module trong `/modules`.
- Mỗi trang sẽ là 1 folder riêng luôn ở dưới `/modules`.

```
app
└───modules
    ├───page-1
    │   └───sub-pages
    │       ├───page-1.1
    │       └───page-1.2
    └───page-2
```

## 3. Tạo Component

### 3.2. Cấu trúc 1 Component

- Mỗi component nên trong 1 thư mục riêng.
- Nếu component có component con riêng, component con sẽ ở file riêng.

```
card-1
    card-1-child.component.tsx
    card-1.component.scss
    card-1.component.tsx
    index.ts
```

### 3.1. Component dùng chung cho `/app` hoặc `/core`

- Component trong `/app` nên chia thành từng nhóm

```
app
└───components
    ├───cards
    │   ├───card-1
    │   └───card-2
    └───layouts
        ├───layout-1
        └───layout-2
```

- Componnet trong `/core` không cần chia thành nhóm, để trực tiếp trong `/components` là được

```
core
├───component-1
└───component-2
```

### 3.2. Một trang có components riêng

- Tạo thư mục components ở trong trang tương ứng

```
page-1
│   index.ts
│   page-1.component.scss
│   page-1.component.tsx
│
└───components
```

## 4. Image và SVG

- Nên để trong thư mục `/app/assets`.

```
app
└───assets
    │   image-1.jpg
    │   image-1.jpg
    │
    ├───image-folder-1
    └───image-folder-1
```

### 4.1. Trong file typescript

- Import như component;

```ts
import logo from "@/app/assets/logo.png"; // Image

import { ReactComponent as Logo } from "@/app/assets/logo-vietjet-red.svg"; // SVG
```

### 4.2. Trong file style SCSS

```scss
background-image: url("/app/assets/logo.png");
```

## 5. Gọi API

- API sẽ được để trong `/app/apis`.
- Mỗi đối tượng API cần để trong 1 file riêng.
- API sẽ phải dùng `HttpService` đã có trong `/core/services/http`.

```
app
└───apis
        products.api.ts
        users.api.ts
```

## 6. Custom Hooks

- Mỗi hook nên khai báo ở một file riêng.
- Hook dùng chung cho cả app đặt trong `/app/hooks`.
- Nếu có hook nào để được trong core thì sẽ đặt trong `/core/hooks`.
- Tên file hook để `kebab-case`, bắt đầu `use-*` để nhận biết.
- Tên hàm hook để `camelCase`, bắt đầu `use*`.

```
src
├───app
│   └───hooks
│           use-hook-1.hook.ts
│           use-hook-2.hook.ts
│
└───core
```

## 7. Redux

### 7.1. Global State

- Project sử dụng `redux` để quản lý state.
- Ngoài ra, còn dùng `redux-observable` để xử lý side-effect hoặc các thao tác bất đồng bộ với state.
- `/app/store` sẽ chứa các reducer handle state global của app.
- Mỗi reducer sẽ là một folder.

```
app
└───store
    │   global.store.ts
    │   index.ts
    │
    ├───reducer-1
    │       index.ts
    │       reducer-1.action.ts
    │       reducer-1.epic.ts
    │       reducer-1.reducer.ts
    │       reducer-1.type.ts
    │
    └───reducer-2
```

### 7.2. State của một trang lớn

- Trường hợp muốn quản lý state riêng của một trang lớn, nên tạo `/store` riêng và để trong folder của trang. Và import reducer vào `global.store.ts`

```
page-1
│   index.ts
│   page-1.component.scss
│   page-1.component.tsx
│
├───store
│   ├───reducer-1
│   └───reducer-2
└───sub-pages
```

## 8. Environments

- Biến môi trường sẽ để trong file `.env`, `.env.development`, `.env.production`, `.env.local`...
- Khi muốn test local, nên copy config từ `env.development` hay `.env.production` ra 1 file `.env.local`(được .gitignore) và tùy ý thay đổi config trong đấy.
- Config trong env phải bắt đầu bắt từ khóa `REACT_APP_*`.
- Tham khảo chi tiết ở [đây](https://create-react-app.dev/docs/adding-custom-environment-variables).

## 9. Các thành phần khác

### 9.1. Thành phần dùng chung khác trong `/app`

- Group thành nhiều folder để trong `/app/shared`

```
app
└───shared
    ├───const
    │       const-1.const.ts
    │       const-2.const.ts
    │
    ├───helpers
    │       helper-1.const.ts
    │       helper-2.const.ts
    │
    ├───services
    └───types
```

### 9.2. Thành phần dùng chung khác trong `/core`

- Không cần để trong `/shared`.
- Mỗi thành phần một folder riêng.

## 10. Code style

- Project format code sử dụng config của `prettier` và lint bằng `eslint`. Nên cài plugin tương ứng trong IDE.
- Project đã có config tự động format code khi save file cho VScode, nên config tương tụ cho IDE khác.
