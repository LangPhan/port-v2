# PullCord — light/dark mode

Đã tích hợp ngày 25/10/2026 trên bản production local tại `http://localhost:3010/vi`.

- Dùng đúng package [PullCord của FeralUI](https://feralui.dev/pullcord), phiên bản MIT `pullcord@0.1.0`, hỗ trợ React 18.
- Theme provider dùng `next-themes` đã có trong repo. Mặc định dark; lựa chọn được lưu với key `portfolio-theme`, khôi phục bằng script trước khi vẽ nội dung.
- Các bề mặt, chữ, nút, tag, menu và vùng liên hệ dùng chung token màu cho light/dark. Ảnh dự án và ảnh chia sẻ giữ nguyên nội dung.
- Nút có nhãn ở cả bốn locale, trạng thái `aria-pressed`, hỗ trợ kéo, click, Enter và Space. Physics ngủ khi dây đứng yên; bỏ animation entrance, giữ xử lý reduced motion của component.
- Theo yêu cầu điều chỉnh tiếp theo, phần dây hiển thị trên desktop tăng từ khoảng **42px lên 84px**; núm kéo vẫn có vùng bấm **46px**. Mobile tăng từ khoảng 34,5px lên 70,5px, chừa vùng bên phải navbar để không chồng lên liên kết.

## Kiểm tra

| Tình huống | Kết quả |
| --- | --- |
| Kéo dây xuống bằng chuột | Chuyển light → dark đúng một lần |
| Click núm kéo | Chuyển dark → light |
| Enter / Space | Đổi theme đúng một lần mỗi phím |
| Reload ở light | Vẫn light, background `rgb(247, 249, 253)` |
| Reload ở dark | Vẫn dark, background `rgb(9, 14, 24)` |
| Chọn English qua menu | Theme light được giữ; nhãn PullCord chuyển sang tiếng Anh |
| Mobile 360px | scrollWidth = clientWidth = 345px; không tràn ngang |
| Dây dài hơn trên mobile | Hộp núm kéo không giao với cả ba liên kết navbar |
| Tương phản light mode | Các mẫu body, tiêu đề xanh, CTA, mô tả, vai trò, tag và email: 6,37–14,94:1 theo màu computed; không thay thế audit toàn bộ trang |
| Console trình duyệt | Không ghi nhận error/warn trong lượt kiểm tra |
| Build / TypeScript | `bun run build` pass, có kiểm tra kiểu; `bun run typecheck` pass |
| Kiểm tra hồi quy | `bun run test:smoke`: 7/7 pass trên bản cuối |
| Lockfile | `bun install --frozen-lockfile`: không thay đổi dependency |

Viewport mobile là mô phỏng, chưa kiểm tra cảm ứng trên điện thoại thật. Điểm Lighthouse của đợt UX trước không được dùng làm kết quả đo cho tính năng mới.

## Ảnh minh chứng

- [Light mode desktop, dây dài gấp đôi](ux-audit/pullcord-light-desktop.png).
- [Dark mode mobile](ux-audit/pullcord-dark-mobile.png).

Bản preview cuối được để ở dark mode. Chưa push hoặc deploy.
