import useIsDesktop from 'app/hooks/useIsDesktop'
import React from 'react'

const TncVi = () => {
  const isDesktop = useIsDesktop()

  return (
    <div>
      {isDesktop && <h2>ĐIỀU KHOẢN VÀ ĐIỀU KIỆN</h2>}

      <div>
        <strong>VÒNG QUAY MIỄN PHÍ MỖI NGÀY</strong>
        <br />
      </div>
      <p>Thời gian khuyến mãi: 21/09-31/12/2023</p>

      <br />
      <div>
        <strong>Cách đổi vòng quay miễn phí</strong>
        <br />
      </div>

      <ol>
        <li>Khuyến mãi này chỉ dành cho các thành viên của Vui123.</li>
        <li>
          Vòng quay miễn phí được tặng ngẫu nhiên cho người chơi mỗi ngày.
        </li>
        <li>Thành viên may mắn sẽ thấy Vòng Quay ngay khi đăng nhập.</li>
      </ol>

      <br />

      <div>
        <strong>Điều khoản và Điều kiện </strong>
      </div>
      <ol>
        <li>
          Giải thưởng sẽ được chuyển đến thành viên hợp lệ trong vòng 3 tuần sau
          khi tin nhắn riêng từ bộ phận Chăm Sóc Khách Hàng gửi đến hộp thư
          thành viên.
        </li>
        <li>
          Giải thưởng tiền mặt sẽ được ghi có vào ví người chơi trong ngày.
        </li>
        <li>
          Giải thưởng tiền mặt cần trải qua 25x vòng cược trước khi được rút.{' '}
        </li>
        <li>
          Người chơi cần nạp tối thiểu 50kVND trước khi thực hiện lệnh rút tiền.{' '}
        </li>
        <li>Vui123 có quyền hoãn và hủy Khuyến Mãi bất cứ lúc nào.</li>
        <li>
          Vui123 có quyền đưa ra quyết định duy nhất và quyết định của Vui123 là
          quyết định cuối cùng.
        </li>
        <li>Điều Khoản & Điều Kiện Chung Vui123 áp dụng.</li>
      </ol>
      <br />
    </div>
  )
}

export default TncVi
