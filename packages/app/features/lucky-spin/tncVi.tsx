import useIsDesktop from 'app/hooks/useIsDesktop'
import { useResponsiveValue } from 'dripsy'
import React from 'react'

const TncVi = () => {
  const isDesktop = useIsDesktop()
  return (
    <div>
      {isDesktop && <h2>ĐIỀU KHOẢN VÀ ĐIỀU KIỆN</h2>}
      <p>TẶNG VÒNG QUAY TÂN THỦ</p>

      <br />
      <div>
        <strong>Cách đổi vòng quay miễn phí</strong>
        <br />
      </div>

      <ol>
        <li>Áp dụng cho TẤT CẢ thành viên mới đăng ký qua ỨNG DỤNG</li>
        <li>
          Các tài khoản có chung địa chỉ IP và sử dụng chung thiết bị không được
          tham gia khuyến mãi này
        </li>
        <li>
          Thành viên nhận vòng quay miễn phí sẽ thấy Vòng Quay May Mắn ngay sau
          khi đăng ký
        </li>
      </ol>

      <br />

      <div>
        <strong>Giải thưởng Vòng quay miễn phí</strong>
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
      </ol>
      <br />

      <div>
        <strong>Điều khoản và Điều kiện </strong>
      </div>
      <ol>
        <li>Vui123 có quyền hoãn và hủy Khuyến Mãi bất cứ lúc nào.</li>
        <li>
          Vui123 có quyền đưa ra quyết định duy nhất và quyết định của Vui123 là
          quyết định cuối cùng.
        </li>
        <li>Điều Khoản & Điều Kiện Chung Vui123 áp dụng.</li>
      </ol>
    </div>
  )
}

export default TncVi
