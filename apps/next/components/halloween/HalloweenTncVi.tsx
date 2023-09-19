import React from 'react'
import BonusTableRow from './BonusTableRow'

const HalloweenTncVi = () => {
  return (
    <div>
      <h2>BÍ NGÔ KINH HOÀNG</h2>
      <p>Thời gian khuyến mãi: 01-31/10/2023</p>

      <br />
      <div>
        <strong>CÁCH CHƠI</strong>
      </div>

      <ol>
        <li>Nạp 1,000,000VND để nhận 1 vé chơi. </li>
        <li>Dùng vé để chơi minigame và trúng thưởng. </li>
        <li>Chọn nút QUAY để bắt đầu chơi.</li>
        <li>VÒNG QUAY sẽ tự động quay đến khi hết vé.</li>
        <li>Mỗi lượt quay mất một vé.</li>
        <li>Số bí tương ứng với giải thưởng của bạn.</li>
      </ol>

      <br />

      <div>
        <strong>CÁCH THỨC TÍNH THƯỞNG</strong>
        <br />
        <BonusTableRow multiplier={1} value={'100K'} />
        <BonusTableRow multiplier={2} value={'200K'} />
        <BonusTableRow multiplier={3} value={'1,000K'} />
      </div>
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

export default HalloweenTncVi
