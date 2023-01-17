import React from 'react'
import Cat from 'app/assets/images/events/cny/zodiac/cat.png'

const TncVi = () => {
  return (
    <div>
      <h2>MÈO MAY MẮN PHÁT LỘC ĐẦU NĂM</h2>
      <p>Thời gian: 20/01 - 31/01/2023</p>

      <br />
      <div>
        <strong>CÁCH CHƠI</strong>
      </div>

      <ol>
        <li>Áp dụng cho TẤT CẢ thành viên.</li>
        <li>Nạp tối thiểu 50,000đ để nhận ngay 1 lượt quay miễn phí.</li>
        <li>
          Bạn phải nạp đủ số tiền tối thiểu trên mỗi giao dịch, không được cộng
          dồn.
        </li>
        <li>Nạp càng nhiều, cơ hội trúng lộc đầu năm càng cao. </li>
      </ol>

      <br />
      <strong>GIẢI THƯỞNG VÒNG QUAY LỘC ĐẦU NĂM</strong>
      <ol>
        <li className="catList">
          1 x
          <img className="cat" src={Cat} alt="cat" />= 38,000đ
        </li>

        <li className="catList">
          2 x
          <img className="cat" src={Cat} alt="cat" />= 388,000đ
        </li>

        <li className="catList">
          3 x
          <img className="cat" src={Cat} alt="cat" />= 3,888,000đ
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
