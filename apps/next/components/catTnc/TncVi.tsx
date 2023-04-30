import React from 'react'
import Cat_0 from 'app/assets/images/events/summerCat/cat_0.png'
import Cat_38 from 'app/assets/images/events/summerCat/cat_88.png'
import Cat_388 from 'app/assets/images/events/summerCat/cat_388.png'
import Cat_3888 from 'app/assets/images/events/summerCat/cat_3888.png'

const TncVi = () => {
  return (
    <div>
      <h2>CHÚ MÈO TÀI LỘC</h2>
      <p>Thời gian: 01/05 - 30/06/2023</p>

      <br />
      <div>
        <strong>CÁCH CHƠI</strong>
      </div>

      <ol>
        <li>Áp dụng cho TẤT CẢ thành viên.</li>
        <li>Nạp tối thiểu 100,000VND để nhận 1 vé chơi.</li>
        <li>
          Bạn phải nạp đủ số tiền tối thiểu trên mỗi giao dịch, không được cộng
          dồn.
        </li>
        <li>Nạp càng nhiều, bạn càng nhận được nhiều lượt quay miễn phí.</li>
        <li>Chạm biểu tượng để xem giải thưởng.</li>
        <li>Ba biểu tượng trùng nhau đầu tiên là giải thưởng của bạn.</li>
      </ol>

      <br />
      <strong>CÁCH THỨC TÍNH THƯỞNG</strong>
      <ol>
        <li className="catList">
          <img className="cat" src={Cat_3888} alt="cat" /> = VND3,888k
        </li>
        <li className="catList">
          <img className="cat" src={Cat_388} alt="cat" /> = VND388k
        </li>
        <li className="catList">
          <img className="cat" src={Cat_38} alt="cat" />= VND38k
        </li>
        <li className="catList">
          <img className="cat" src={Cat_0} alt="cat" />= VND0k
        </li>
      </ol>
      <br />

      <div>
        <strong>ĐIỀU KHOẢN & ĐIỀU KIỆN</strong>
      </div>
      <ol>
        <li>Khuyến mãi này dành cho tất cả người chơi của Vui123.</li>
        <li>Giải thưởng tiền mặt sẽ được ghi có trong ví của người chơi. </li>
        <li>
          Giải thưởng tiền mặt cần trải qua một vòng cược trước khi rút tiền.
        </li>
        <li>
          Vé thưởng phải được quy đổi trong thời gian khuyến mãi. Vé chưa quy
          đổi sẽ bị hủy khi chương trình kết thúc.{' '}
        </li>
        <li>Vui123 có quyền hoãn và hủy Khuyến Mãi bất cứ lúc nào.</li>
        <li>
          Vui123 có quyền đưa ra quyết định duy nhất và quyết định của Vui123 là
          quyết định cuối cùng.
        </li>
        <li>Áp dụng Điều Khoản & Điều Kiện Chung của Vui123.</li>
      </ol>
    </div>
  )
}

export default TncVi
