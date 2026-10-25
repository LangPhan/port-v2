# Kiểm chứng bản sửa UX

Ngày: 25/10/2026. Repo nền: `e036f80`. Kiểm tra bản production local tại `http://localhost:3010/vi`. Chưa triển khai lên domain công khai.

Các phép đo Lighthouse dưới đây là mốc sau đợt sửa UX, trước khi thêm light/dark mode. Tính năng mới được kiểm chứng riêng trong [báo cáo PullCord](PULLCORD-THEME.md); không dùng điểm cũ để khẳng định hiệu năng bản mới.

## Các thay đổi đã thực hiện

- Thay form không hoạt động bằng email `phanvandat.it@gmail.com` do chủ portfolio xác nhận. Địa chỉ hiển thị, chọn/copy được và có liên kết mailto đúng người nhận.
- Header bám đầu trang, có ba anchor và bộ chọn ngôn ngữ có nhãn. Hero dùng tên/vai trò cố định và hai CTA đến dự án/liên hệ.
- Giữ phong cách tối và xanh; thay particles, flip words và icon cloud bằng trang trí CSS tĩnh. Nội dung chính có sẵn ngay trong HTML, không phải chờ animation.
- Đưa dự án lên trước phần giới thiệu. Ba dự án nổi bật có ảnh, tóm tắt, vai trò và phần chi tiết; ba mục còn lại nằm trong phần mở rộng.
- AI E-shoes Shop: Frontend, repo và video demo do chủ portfolio cung cấp. TDTU FIND: Frontend & Backend, có repo công khai. Công nghệ của ShoeStore được đối chiếu thêm với package.json của repo frontend.
- KADA giữ ảnh và mô tả thiết kế/xây dựng từ nội dung cũ; bỏ nút website vì domain không phân giải được trong trình duyệt lúc kiểm tra. Không thêm kết quả kinh doanh hoặc số liệu chưa xác minh.
- Mobile dùng thẻ một cột, bỏ gutter timeline. Kỹ năng chia ba nhóm, mỗi nhóm dẫn đến dự án liên quan.
- Hoàn thiện H1, landmark, skip link, alt, accessible name, focus và CTA không lồng phần tử tương tác. Liên kết ngoài thông báo mở tab mới.
- Nhãn và mô tả ở cả bốn ngôn ngữ; giữ route /jp, /kr nhưng dùng lang/hreflang ja, ko theo chuẩn.
- Metadata, canonical, hreflang, sitemap, robots, favicon SVG nhỏ và ảnh chia sẻ PNG đã hoạt động.
- Font hệ thống hỗ trợ tiếng Việt, không cần tải font web. Ảnh hero được ưu tiên tải và có kích thước responsive.
- Next.js ghim 15.5.28 theo [bản vá chính thức](https://nextjs.org/blog/nextjs-security-update-october-14-2026). Bật lại kiểm tra TypeScript trong build; sửa hai lỗi kiểu/import cũ ở component mẫu.
- Analytics chỉ chạy trên môi trường Vercel, tránh yêu cầu script 404 ở host khác.

## Kết quả Lighthouse mobile

Lighthouse 13.5.0, Chrome headless, cùng cấu hình simulated mobile 412 × 823, DPR 1,75, CPU slowdown 4× và mạng mô phỏng. Mỗi bản chạy ba lần. Script tổng hợp xác nhận cấu hình của sáu báo cáo khớp nhau. Giá trị dưới đây là trung vị.

| Chỉ số | Trước | Sau |
| --- | ---: | ---: |
| Performance | 42 | 99 |
| Accessibility | 94 | 100 |
| Best practices | 96 | 100 |
| SEO | 91 | 100 |
| LCP | 7,29 s | 2,04 s |
| CLS | 0 | 0 |
| Total Blocking Time | 6.349 ms | 19,5 ms |
| Tổng dữ liệu truyền trong lượt đo | 755.888 byte | 231.923 byte |
| Font web | 144.885 byte | 0 byte |
| First Load JS theo next build | 248 kB | 110 kB |

Performance ba lượt cuối: **98 / 99 / 99**. LCP: **2,43 / 1,96 / 2,04 giây**. Không còn audit binary thất bại trong cả ba báo cáo cuối.

Đây là số đo lab trên localhost, không phải kết quả của site đã deploy hoặc dữ liệu người dùng thật. Chưa có dữ liệu field để xác nhận INP. Accessibility 100 là kết quả tự động, không thay thế toàn bộ kiểm tra bằng trình đọc màn hình.

[Tổng hợp máy đọc được, cấu hình và SHA-256 của báo cáo gốc](ux-audit/lighthouse-summary.json). Báo cáo gốc giữ local trong `.reports/` và được gitignore.

## Kiểm tra đã qua

| Yêu cầu | Bằng chứng |
| --- | --- |
| Cài đặt tái lập | `bun install --frozen-lockfile`: không thay đổi dependency |
| TypeScript | `bun run typecheck`: pass |
| Production build | `bun run build`: pass, có kiểm tra kiểu |
| Smoke HTTP | `bun run test:smoke`: 7/7 pass trên bản cuối |
| Bốn locale | HTTP 200, một H1, main/section, contact, liên kết dự án, metadata và ảnh chia sẻ hợp lệ |
| Negotiation | vi-VN → /vi, ja-JP → /jp, ko-KR → /kr; fallback và query string được giữ |
| SEO assets / 404 | robots/sitemap/icon không bị redirect locale; PNG hợp lệ; path không tồn tại trả 404 |
| Responsive VI | 360/390/640/768/1024/1440px: scrollWidth bằng clientWidth, navbar nằm trong header |
| Responsive EN/JP/KR | 390px: không tràn ngang; ngôn ngữ HTML và nhãn hiển thị đúng |
| Anchor/focus | Skip link tập trung main; điều hướng đến section; kỹ năng tập trung article tương ứng |
| Offset header | Mobile: article ở khoảng 138px, header khoảng 113px; bỏ lỗi cộng offset hai lần |
| Chi tiết bằng bàn phím | Enter mở/đóng chi tiết KADA và phần ba dự án thêm; nội dung thêm hiện/ẩn đúng |
| Chuyển ngôn ngữ | VI → EN giữ #contact, menu đóng và nội dung mới hiện đúng |
| Giảm chuyển động | Trang chính không dùng canvas/3D/animation lặp; CSS reduced-motion đổi smooth scroll thành auto và giảm transition |
| Ảnh chia sẻ | PNG 1200 × 630 được tạo thật, kiểm tra chữ tiếng Việt bằng ảnh render |
| Lỗi console | Audit console trên ba lượt cuối đều pass |
| Zoom trình duyệt 200% | Người dùng đã kiểm tra bản local và xác nhận “Đã kiểm tra, hiển thị tốt” ngày 25/10/2026 |

Kiểm tra giao diện chạy trong trình duyệt trên máy Windows thực tế, kết hợp emulation viewport mobile. Reflow 640px đã được kiểm tra tự động; zoom trình duyệt 200% được người dùng kiểm tra riêng và xác nhận hiển thị tốt. Công cụ điều khiển cửa sổ trình duyệt đã dừng vì không xác định chắc chắn URL, nên kết quả zoom là xác nhận thủ công của người dùng, không phải phép đo tự động.

Người dùng đã chọn kiểm tra điện thoại vật lý **sau khi deploy**. Mục này được chuyển sang bước kiểm tra sau phát hành theo lựa chọn đó; chưa được đánh dấu đã kiểm tra. Phạm vi sửa code và nghiệm thu local đã hoàn tất. Không thay đổi thiết lập OS hoặc gửi email thử cho bên ngoài.

Build còn cảnh báo Browserslist cũ và ba class Tailwind mơ hồ trong component GlareCard không còn được trang chính sử dụng. Các cảnh báo này đã có ở bản nền; build/typecheck vẫn pass, không có lỗi console tương ứng trên trang mới.

## Ảnh đối chiếu

- Desktop: [trước](ux-audit/desktop-hero.png) → [sau](ux-audit/desktop-hero-after.png).
- Mobile: [dự án trước](ux-audit/mobile-project.png) → [dự án sau](ux-audit/mobile-project-after.png).
- [Hero mobile mới](ux-audit/mobile-hero-after.png).
- [Ảnh chia sẻ PNG](ux-audit/social-preview.png).

## Chạy lại

```powershell
bun install --frozen-lockfile
bun run typecheck
bun run build
bun run start -- --port 3010
```

Trong terminal khác:

```powershell
bun run test:smoke
.\scripts\lighthouse.ps1
node scripts\summarize-lighthouse.mjs
```

Script tổng hợp cần có đủ ba file before và ba file after trong `.reports/`. Giữ nguyên báo cáo before của baseline khi đo lại bản mới.

## Kiểm tra khi phát hành

- Kiểm tra điện thoại thật sau deploy theo lựa chọn của người dùng. Zoom 200% đã được người dùng xác nhận trên bản local.
- Chạy smoke check trên preview của hosting nếu cấu hình triển khai khác local, đặc biệt ảnh Next Image và PNG chia sẻ.
- Xác nhận cấu hình domain/hosting rồi phát hành theo workflow của repo. Bản sửa hiện chưa push hoặc deploy.
