import useIsDesktop from 'app/hooks/useIsDesktop'
import React from 'react'

const TncVi = () => {
  const isDesktop = useIsDesktop()


  return (
    <div>
      {isDesktop && <h2>ĐIỀU KHOẢN VÀ ĐIỀU KIỆN</h2>}
      <p>CHÀO MỪNG TÂN THỦ</p>

      <br />
      <div>
        <strong>Cách Tham Gia</strong>
        <br />
      </div>

      <ol>
        <li>Áp dụng cho TẤT CẢ thành viên mới đăng ký</li>
        <li>
          Các tài khoản có chung địa chỉ IP và sử dụng chung thiết bị không được
          tham gia khuyến mãi này
        </li>
        <li>
          Thành viên hợp lệ cho chương trình LẮC XÍ NGẦU MIỄN PHÍ sẽ nhìn thấy
          thông báo ngay sau khi đăng ký.
        </li>

        <li>Bấm "BẮT ĐẦU" để lắc xí ngầu.</li>
        <li>
          Số bước di chuyển được tính dựa trên kết quả của 2 viên xí ngầu, theo
          chiều kim đồng hồ với bước 1 là Vui123 logo.{' '}
        </li>
        <li>Giải thưởng tương ứng với vị trí mà biểu tượng dừng lại. </li>
        <li>Nếu kết quả là ? , bạn sẽ có cơ hội trúng giải thưởng bí mật.</li>
      </ol>

      <br />

      <div>
        <strong>Điều khoản và Điều kiện </strong>
      </div>
      <ol>
        <li>
          Giải thưởng tiền mặt cần trải qua 25 vòng cược trước khi được rút.{' '}
        </li>
        <li>
          Người chơi cần nạp tối thiểu 50kVND trước khi thực hiện lệnh rút tiền.
        </li>
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
