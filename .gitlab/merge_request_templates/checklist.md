## Checklist

**Technical:**

- [ ] Sử dụng function component, tạo component bằng arrow function, để kiểu là `React.FC`.
- [ ] Cấu trúc props truyền vào component phải định nghĩ trong file component đó và thêm vào generic cho kiểu component(`React.FC<SomePropType>`).
- [ ] Không sử dụng kiểu `any`, hoặc để implicit any.
- [ ] Sử dụng `safe navigation operator` ở những chỗ cần thiết.
- [ ] Tên biến và hàm sử dụng `camelCase`, tên class/component/kiểu sử dụng `PascalCase`, key của enum và const sử dụng `UPPER_SNAKE_CASE`.
- [ ] Xóa hết `console.log`, `console.error`, import hoặc code thừa.
- [ ] Khi tạo thành phần mới, để vào `core` nếu có thể sử dụng lại được ở những project khác; để vào `app` nếu chỉ dùng trong project hiện tại.
- [ ] Thành phần của `/core` không được dùng thành phần của `/app`, chỉ được ngược lại.
- [ ] Mỗi component phải đặt trong 1 file riêng, không để nhiều component trong 1 file.
- [ ] Mỗi module hoặc trang lớn nên tạo 1 file route config `*.route.ts` và 1 file `*.component.tsx` để dùng route config đó.
- [ ] Mỗi trang/module/component nên trỏ ra 1 file `index.ts` để tiện import.
- [ ] Sử dụng path alias import. Nếu import thành-phần-ngoài <= 1 tầng hoặc thành-phần-con thì có thể tương đối.
- [ ] Phải unsubscribe các subscription(dùng `resetSession()`, `destroy$` hay các các unsubscribe khác).
- [ ] File README.md có chứa cấu trúc tổng quan project, tham khảo để biết vị trí đặt các thành phần.
- [ ] `/app/styles` và `/core/styles` chứa css dùng chung, không để CSS riêng của component hay trang vào đấy.
- [ ] CSS riêng của 1 trang hay component đặt tên theo format `*.component.scss`.
- [ ] Không viết inline-style CSS.
- [ ] Tab là 2 spaces, tên file vào folder để format `kebab-case`.
