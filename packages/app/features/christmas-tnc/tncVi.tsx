import useIsDesktop from 'app/hooks/useIsDesktop'
import React from 'react'

const TncVi = () => {
  const isDesktop = useIsDesktop()

  return (
    <div>
      {isDesktop && <h2>ĐIỀU KHOẢN VÀ ĐIỀU KIỆN</h2>}
      <div>
        <strong>VUI GIÁNG SINH, RINH QUÀ KHỦNG</strong>
        <br />
      </div>
      <p>Thời gian áp dụng: ngày 25/12/2023 (12.00AM - 10.00AM - 8.00PM)</p>

      <br />
      <div>
        <strong>Cách thức nhận thưởng</strong>
        <br />
      </div>

      <ol>
        <li>
          Quà Giáng Sinh từ Vui123 đến tất cả thành viên trong các khung giờ may
          mắn trên.{' '}
        </li>
        <li>
          Số lượng quà có hạn và có thể sẽ hết trước khi khuyến mãi kết thúc.{' '}
        </li>
        <li>Thành viên sẽ thấy thông báo bất ngờ ngay khi đăng nhập. </li>
        <li>
          Xu Vui sẽ được chuyển đến ví thành viên sau khi thực hiện quy đổi.
        </li>
        <li>Thành viên có thể sử dụng Xu Vui tại mục PHẦN THƯỞNG CỦA TÔI</li>
        <li>Các khuyến cần trải qua 1 vòng cược trước khi rút.</li>
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
