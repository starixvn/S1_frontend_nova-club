import React from 'react'
import Gold from 'app/assets/images/events/spinMania/multiplier/gold.png'
import Green from 'app/assets/images/events/spinMania/multiplier/green.png'
import Red from 'app/assets/images/events/spinMania/multiplier/red.png'

const TncVi = () => {
  return (
    <div>
      <h2>QUAY SỐ MAY MẮN</h2>
      <p>Thời gian: 1 - 31 March 2023</p>

      <br />
      <div>
        <strong>CÁCH CHƠI</strong>
      </div>

      <ol>
        <li>Áp dụng cho TẤT CẢ thành viên.</li>
        <li>Nạp tối thiểu 100,000đ để nhận ngay 1 lượt quay miễn phí.</li>
        <li>
          Bạn phải nạp đủ số tiền tối thiểu trên mỗi giao dịch, không được cộng
          dồn.
        </li>
        <li>Nạp càng nhiều, cơ hội trúng lộc đầu năm càng cao. </li>
        <li>
          Quay trúng các biểu tượng nhân đôi, nhân ba phần thưởng từ Vui123.
        </li>
        <li>
          Tiền thưởng cuối cùng sẽ được nhân với biểu tượng bội số nhân bạn quay
          được gần nhất.
        </li>
      </ol>

      <br />
      <strong>CÁCH THỨC TÍNH THƯỞNG</strong>
      <ol>
        <li className="catList">
          <img className="cat" src={Green} alt="vuix1" />= 1x bội số tiền thưởng
        </li>

        <li className="catList">
          <img className="cat" src={Red} alt="vuix2" />= 2x bội số tiền thưởng
        </li>

        <li className="catList">
          <img className="cat" src={Gold} alt="vuix3" />= 3x bội số tiền thưởng
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
          đổi sẽ bị hủy khi chương trình kết thúc.
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
