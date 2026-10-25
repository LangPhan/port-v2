# Đánh giá UX và kế hoạch cải thiện portfolio

Ngày kiểm tra: 25/10/2026. Trang: https://phanvandat.id.vn/vi. Repo đối chiếu: commit `e036f80`.

Trạng thái triển khai: đã có bản sửa local. Xem [kết quả kiểm chứng](UX-VERIFICATION.md) và các giới hạn kiểm tra trước khi phát hành. Phần dưới lưu lại đánh giá và kế hoạch ban đầu.

## Kết luận

Trang có phong cách riêng: nền tối, điểm nhấn xanh, ảnh cá nhân và ảnh dự án thật. Tuy nhiên, trải nghiệm hiện tại dành nhiều diện tích cho hiệu ứng hơn thông tin giúp người xem quyết định liên hệ. Ưu tiên là khôi phục đường liên hệ, làm rõ danh tính/năng lực và giúp đọc nhanh dự án; sau đó mới tinh chỉnh chuyển động.

Giả định mục tiêu: nhà tuyển dụng hoặc khách hàng hiểu Đạt làm gì, xem được bằng chứng và tìm được cách liên hệ trong khoảng 30–60 giây. Đây là mục tiêu thiết kế, chưa phải kết quả đo người dùng.

## Phạm vi và bằng chứng

- Đã mở trang live ở desktop, đi qua hero → giới thiệu → dự án → liên hệ; thử nút khám phá, nút liên hệ với form trống và chuyển VI → EN.
- Đã kiểm tra viewport mobile 390 × 844, gồm hero, điểm đến giới thiệu, dự án và menu ngôn ngữ. Đây là mô phỏng viewport, chưa phải thiết bị điện thoại thật.
- Đã đối chiếu component, dictionary và cấu hình repo. Chưa xác minh commit đang deploy có trùng repo hay không.
- Chưa chạy Lighthouse, đo Core Web Vitals, kiểm tra đầy đủ trình đọc màn hình hoặc xác thực toàn bộ liên kết ngoài. Các nhận định hiệu năng bên dưới là rủi ro từ cấu trúc code, không phải kết quả benchmark.
- Ảnh minh chứng: [desktop hero](ux-audit/desktop-hero.png), [mobile project](ux-audit/mobile-project.png).

## Vấn đề theo mức ưu tiên

| Mức | Quan sát và tác động | Hướng sửa | Vị trí trong repo |
| --- | --- | --- | --- |
| P0 | Bấm “Liên hệ ngay” với form trống chỉ hiện `Coming soon Feature 😂`. Code cũng chỉ `preventDefault()` rồi `alert`; khách đi hết trang vẫn không thể gửi yêu cầu. | Cung cấp kênh email thật ngay khi có địa chỉ xác minh; chỉ giữ form nếu gửi được thật. Nếu dùng form: validation, trạng thái đang gửi/thành công/lỗi và giữ nội dung khi lỗi. | `Contact/Contact.tsx:8` |
| P1 | Navbar chỉ có logo và đổi ngôn ngữ; không có lối tắt đến dự án hoặc liên hệ. Người xem phải cuộn qua toàn bộ nội dung. | Thêm Giới thiệu / Dự án / Liên hệ, CTA rõ, header gọn có thể bám đầu trang. Anchor có khoảng bù header và focus phù hợp. | `Navbar.tsx:9`, `page.tsx` |
| P1 | Hero không nêu tên Đạt; vai trò đổi Front-end/Back-end/Full-stack trong khi phần giới thiệu nói Front-end. Logo VI là Lãng, EN thành David, footer là Lang. | Chọn danh tính và vai trò chính nhất quán theo thông tin thực tế. Tên + vai trò tĩnh, câu giá trị ngắn; nút “Xem dự án” và “Liên hệ”. | `Hero/Hero.tsx:37`, `dictionaries/*.json`, `Footer.tsx` |
| P1 | Có 6 dự án nhưng chỉ KADA có nút Visit. Các đoạn văn chủ yếu kể tính năng sản phẩm, thiếu vai trò, phạm vi đóng góp và kết quả có thể kiểm chứng. | Chọn 3 dự án nổi bật; mỗi dự án có ảnh, mô tả ngắn, vai trò, đóng góp, công nghệ chính và đường xem bằng chứng. Dự án thiếu demo có thể dùng case study hoặc repo được phép công khai. | `Project/Project.tsx`, `Project/Content.tsx` |
| P1 | Trên mobile, timeline chừa `pl-20` (80px) trước phần nội dung. Mô tả đầu tiên gần kín một màn hình rồi mới đến ảnh. Tên dự án màu xám khá chìm. | Dùng thẻ một cột trên mobile, ảnh/tiêu đề/giá trị trước; bỏ gutter timeline, rút mô tả còn 2–3 câu và cho đọc thêm khi cần. Tăng độ nổi bật tiêu đề, đo tương phản thực tế. | `ui/timeline.tsx:49`, `:55`, `:60` |
| P2 | Phần giới thiệu là một đoạn chữ đậm dài và quả cầu khoảng 30 logo, chiếm gần một màn hình. Người xem phải tự suy ra kỹ năng nào là trọng tâm. | Đoạn giới thiệu ngắn, 3–4 nhóm kỹ năng có tên; liên kết kỹ năng với dự án tương ứng. Quả cầu chỉ là minh họa tùy chọn. Thay `h-screen` bằng chiều cao theo nội dung. | `Profile/Profile.tsx:41` |
| P2 | Nền sao chạy cả trang, đường chuyển động trong hero, flip chữ và icon cloud cùng xuất hiện. Code particle đặt giới hạn 120 FPS. | Giữ tối đa một hiệu ứng nổi bật tại mỗi vùng; giới hạn nền động ở hero, dừng khi ngoài viewport/tab ẩn, giảm tải mobile và hỗ trợ reduced motion. Đo trước/sau. | `page.tsx:19`, `ui/sparkles.tsx:72`, các component animation |
| P2 | Trang VI còn “Tech stacks”, “Description”, “Visit” dù dictionary đã có nhãn Việt. Nút đổi ngôn ngữ chưa có accessible name rõ trong cây AX. | Dùng dictionary cho toàn bộ nhãn, đặt tên nút và thể hiện ngôn ngữ hiện tại; thống nhất thương hiệu qua mọi locale. | `Project/Content.tsx:21`, `:35`, `locale-switcher.tsx`, `dictionaries/*.json` |
| P2 | Không có H1; ảnh dự án dùng chung alt `hero template`; nhiều icon chỉ được đọc là “icon”. Wrapper toàn trang có `select-none`. CTA lồng button trong link. | Một H1 mô tả tên/vai trò; landmark main và heading hợp lý; alt theo dự án, tên công nghệ dạng chữ; trang trí ẩn khỏi AX; cho chọn/copy văn bản; mỗi CTA chỉ có một phần tử tương tác. | `Hero/Hero.tsx`, `Project/Content.tsx:43`, `ui/icon-cloud.tsx`, `page.tsx:19` |
| P3 | Title `Lang Portfolio V2` và description chung chung; chưa thể hiện nghề/người/locale khi tìm kiếm hoặc chia sẻ. | Metadata theo locale, canonical/hreflang phù hợp, ảnh chia sẻ, favicon tối ưu; chỉ đưa thông tin thật. | `layout.tsx:47`, assets trong `public/` |

Các đường dẫn component trong bảng nằm dưới `app/[lang]/components/`, trừ khi ghi khác.

## Bố cục đề xuất

1. **Header:** tên/thương hiệu thống nhất, ba anchor, đổi ngôn ngữ có nhãn.
2. **Hero:** “Phan Văn Đạt — [vai trò chính đã xác minh]”, một câu mô tả thế mạnh, một ảnh cá nhân, hai CTA Xem dự án / Liên hệ.
3. **Dự án nổi bật:** 3 dự án có bằng chứng tốt nhất; thẻ cô đọng và trang/phần case study khi cần. Các dự án còn lại nằm dưới mục mở rộng.
4. **Giới thiệu và kỹ năng:** ngắn, có nhóm kỹ năng, kinh nghiệm/học vấn nếu đã xác minh; tránh danh sách công nghệ không có ngữ cảnh.
5. **Liên hệ:** email hiển thị và bấm được, liên kết nghề nghiệp đã xác minh; form chỉ xuất hiện khi có kênh nhận thực tế.
6. **Footer:** cùng danh tính với header, đường quay lại đầu trang khi cần.

Giữ nền tối, màu xanh chủ đạo và ảnh dự án hiện có. Giảm mật độ sao dưới vùng nội dung để chữ và ảnh dễ đọc hơn. Không cần thêm filter dự án khi chỉ có 6 mục.

## Kế hoạch triển khai

### Đợt 1 — Khôi phục liên hệ và đường đi chính (P0/P1)

Ước lượng 0,5–1 ngày làm việc, sau khi có dữ liệu liên hệ.

- Xác minh tên hiển thị, vai trò chính, email nhận liên hệ và các liên kết được công khai.
- Thay form giả bằng email CTA hoạt động trước. Nếu cần form, nối endpoint gửi thật sau khi cấu hình dịch vụ/biến môi trường; không hiển thị thành công nếu dịch vụ chưa xác nhận tiếp nhận.
- Nếu triển khai endpoint: validate cả server, giới hạn độ dài, xử lý chống spam/rate limit phù hợp; không đưa khóa dịch vụ xuống client.
- Thêm anchor `projects`, `about`/`profile`, `contact`; navbar và hai CTA hero trỏ đúng section.
- Chuẩn hóa tên/vai trò ở hero, giới thiệu, footer và dictionary; thêm H1.

**Nghiệm thu:** từ màn hình đầu đi đến dự án hoặc kênh liên hệ bằng một lần bấm; email mở đúng người nhận. Nếu giữ form: dữ liệu trống/sai bị chặn, đang gửi có phản hồi, lỗi không làm mất nội dung, gửi thành công được xác minh tại hộp thư thử nghiệm được phép dùng.

### Đợt 2 — Làm rõ bằng chứng năng lực và sửa mobile (P1)

Ước lượng 1–2 ngày, phụ thuộc nội dung dự án.

- Tách dữ liệu dự án có kiểu rõ: tên, ảnh, tóm tắt, vai trò, đóng góp, công nghệ, trạng thái và các link tùy chọn.
- Chọn 3 dự án nổi bật dựa trên chất lượng và bằng chứng thực tế, không tự gán thứ hạng khi chưa rà soát.
- Mỗi dự án nêu ngắn: bài toán → phần mình làm → kết quả hoặc sản phẩm bàn giao. Không tự thêm số liệu hiệu quả hoặc khả năng AI chưa được chứng minh.
- Đặt ảnh và nội dung quan trọng trước; stack hiển thị tên chữ, giới hạn số badge. Thêm case study cho dự án không có demo/repo công khai.
- Thay timeline mobile bằng thẻ full width với padding khoảng 16–20px; desktop dùng grid hoặc các hàng cân đối. Timeline chỉ giữ khi có thời gian/mốc thực sự cần kể.
- Viết lại giới thiệu ngắn và nhóm kỹ năng; bỏ chiều cao cố định không cần thiết.

**Nghiệm thu:** kiểm tra 360/390/768/1024/1440px; không cuộn ngang hoặc chồng nội dung; tại 390px mỗi thẻ sớm thể hiện được tên, ảnh và tóm tắt; người đọc xác định được phần đóng góp của Đạt và cách xem bằng chứng ở mỗi dự án nổi bật.

### Đợt 3 — Khả năng tiếp cận, ngôn ngữ và hiệu năng (P2/P3)

Ước lượng 1–2 ngày, sau khi bố cục ổn định.

- Hoàn thiện keyboard/focus, skip link, landmark, label, alt, CTA một phần tử tương tác; bỏ `select-none` khỏi nội dung.
- Dùng dictionary cho nhãn dự án, CTA và trạng thái form; rà soát đủ các locale đang hỗ trợ. Không tự đổi mã route `/jp` và `/kr` trong đợt UX; nếu chuẩn hóa mã ngôn ngữ cần kế hoạch redirect riêng.
- Hỗ trợ `prefers-reduced-motion`: nội dung chính hiện ngay, hiệu ứng nền/flip/cloud có phương án tĩnh; tránh phải chờ animation mới đọc được.
- Đo Lighthouse mobile với cùng cấu hình trước/sau, chạy tối thiểu 3 lần và ghi giá trị trung vị; đánh giá bundle, main-thread và ảnh thực sự tải qua mạng.
- Giới hạn particles ở hero, bỏ tương tác không cần thiết, tải trễ phần trang trí nặng; thêm `sizes`/tối ưu ảnh theo kích thước thực tế. Dung lượng PNG nguồn không đồng nghĩa dung lượng Next Image truyền tải.
- Bổ sung metadata theo locale và ảnh chia sẻ. Ghim phiên bản Next phù hợp với lockfile hiện có trước khi thay đổi dependency; không nâng cấp hàng loạt trong đợt UX.

**Nghiệm thu:** thao tác luồng chính bằng bàn phím, focus nhìn thấy; menu/CTA có tên rõ; chữ đạt tương phản mục tiêu 4,5:1 cho chữ thường và 3:1 cho chữ lớn; mục tiêu kích thước vùng bấm 44px. Với reduced motion, thông tin vẫn đầy đủ và không có animation không cần thiết.

**Mục tiêu hiệu năng để kiểm chứng:** LCP ≤ 2,5s, CLS ≤ 0,1; INP ≤ 200ms khi có dữ liệu field phù hợp. Lighthouse không xác nhận INP thực tế của người dùng; chưa có dữ liệu đủ thì chỉ báo kết quả lab và giới hạn đo.

## Điều kiện trước khi hoàn tất nội dung

- Tên/thương hiệu và vai trò ưu tiên thực tế; “sinh viên mới tốt nghiệp” còn đúng hay cần cập nhật.
- Email nhận liên hệ, CV nếu muốn công khai, GitHub/LinkedIn cá nhân được xác minh. Không tự suy ra URL từ tên tài khoản GitHub của repo.
- Vai trò, thời gian, phần đóng góp, trạng thái triển khai, link và quyền công khai từng dự án. Chỉ dùng kết quả/số liệu có bằng chứng.

Không cần chặn việc sửa layout, navigation, nhãn ngôn ngữ và accessibility để đợi các dữ liệu trên. Không publish thông tin phỏng đoán.

## Kiểm tra trước khi phát hành

- Build/type check theo công cụ dự án; bổ sung kiểm thử có ý nghĩa cho validation và gửi form nếu triển khai backend.
- Kiểm tra anchors, keyboard, menu ngôn ngữ, trang VI/EN và smoke test các locale còn lại; xác minh link dự án ở thời điểm triển khai.
- Kiểm tra desktop và viewport hẹp, zoom 200%, reduced motion; kiểm tra thêm ít nhất một thiết bị thật.
- Nếu thêm form, thử trường hợp thành công, lỗi dịch vụ và submit lặp trên môi trường thử nghiệm được phép dùng.
- Chụp cùng các màn hình trước/sau và ghi kết quả đo; không công bố điểm Lighthouse khi chưa chạy.

Tổng công sức dự kiến: khoảng 3–5 ngày làm việc, phụ thuộc mức sẵn sàng của nội dung và việc có triển khai dịch vụ gửi form hay không. Báo cáo này là kế hoạch; chưa sửa mã ứng dụng hoặc triển khai lên site.
