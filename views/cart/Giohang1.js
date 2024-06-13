var soLuong = 0;

function giamSoLuong(){
    if(soLuong >0){
        soLuong--;
        capNhatSoLuong();
    }
}
function tangSoLuong(){
    soLuong++;
    capNhatSoLuong();
}

function capNhatSoLuong() {
    document.getElementById("soLuong").innerHTML = soLuong; 
}

function chonMauGiay(duongDanAnh) {
    document.getElementById('productImage').src = duongDanAnh;
    // Loại bỏ lớp 'selected' từ tất cả các ảnh mẫu giày
    var mauGiayList = document.querySelectorAll('.mau-giay');
    mauGiayList.forEach(function(anh) {
        anh.classList.remove('selected');
    });

    // Thêm lớp 'selected' cho ảnh mẫu giày được chọn
    event.currentTarget.classList.add('selected');
}
function chonSizeGiay(button) {
    // Loại bỏ lớp 'selected' từ tất cả các nút size giày
    var szgiayList = document.querySelectorAll('.szgiay');
    szgiayList.forEach(function(btn) {
        btn.classList.remove('selected');
    });

    // Thêm lớp 'selected' cho nút size giày được chọn
    button.classList.add('selected');
}
//Giỏ hàng
let gioHang = [];


function themVaoGioHang() {
    let soLuongText = document.getElementById('soLuong').textContent;
    let soLuong = parseInt(soLuongText);
    let mauGiayChon = document.querySelector('.mau img.selected');
    let sizeGiayChon = document.querySelector('.szgiay.selected');

    if (mauGiayChon && sizeGiayChon && soLuong > 0) {
        let mauGiay = mauGiayChon.alt;
        let sizeGiay = sizeGiayChon.textContent;
        let donGia = 2300000; // Giả sử đơn giá là 2,300,000 VND
        let tongTienSanPham = donGia * soLuong;

        let sanPham = {
            mauGiay: mauGiay,
            sizeGiay: sizeGiay,
            soLuong: soLuong,
            donGia: donGia,
            tongTien: tongTienSanPham
        };

        gioHang.push(sanPham);
        hienThiSanPham();
        hienThiTongTienThanhToan(); // Cập nhật tổng tiền trong phần thanh toán
    } else {
        if (!mauGiayChon) {
            alert('Vui lòng chọn mẫu giày trước khi thêm vào giỏ hàng.');
        } else if (!sizeGiayChon) {
            alert('Vui lòng chọn size giày trước khi thêm vào giỏ hàng.');
        } else {
            alert('Vui lòng chọn số lượng sản phẩm trước khi thêm vào giỏ hàng.');
        }
    }
}


function hienThiSanPham() {
    let sanPhamDaChon = document.getElementById('sanPhamDaChon');
    let tongTien = document.getElementById('tongTien');
    sanPhamDaChon.innerHTML = '';
    tongTien.textContent = '';

    let tongTienGioHang = 0;
    gioHang.forEach(function(sanPham, index) {
        let sanPhamHTML = `
            <div class="sanPham">
                <p><strong>Mẫu giày:</strong> ${sanPham.mauGiay}</p>
                <p><strong>Size giày:</strong> ${sanPham.sizeGiay}</p>
                <p><strong>Số lượng:</strong> ${sanPham.soLuong}</p>
                <p><strong>Đơn giá:</strong> ${sanPham.donGia} VND</p>
                <p><strong>Tổng tiền:</strong> ${sanPham.tongTien} VND</p>
            </div>
        `;
        sanPhamDaChon.innerHTML += sanPhamHTML;
        tongTienGioHang += sanPham.tongTien;
    });

    tongTien.textContent = `Tổng tiền giỏ hàng: ${tongTienGioHang} VND`;
}
// Hàm xóa sản phẩm
// Hàm xóa sản phẩm
function xoaSanPham(index) {
    gioHang.splice(index, 1); // Xóa sản phẩm khỏi mảng gioHang
    hienThiSanPham(); // Hiển thị lại danh sách sản phẩm
    hienThiTongTienThanhToan(); // Cập nhật tổng tiền trong phần thanh toán
}


// Hàm hiển thị sản phẩm
function hienThiSanPham() {
    let gioHangDaChon = document.getElementById('gioHangDaChon');
    gioHangDaChon.innerHTML = ''; // Xóa nội dung cũ trước khi hiển thị mới

    gioHang.forEach(function(sanPham, index) {
        let sanPhamHTML = `
            <div class="sanPham">
                <p><strong>Mẫu giày:</strong> ${sanPham.mauGiay}</p>
                <p><strong>Size giày:</strong> ${sanPham.sizeGiay}</p>
                <p><strong>Số lượng:</strong> ${sanPham.soLuong}</p>
                <p><strong>Đơn giá:</strong> ${sanPham.donGia} VND</p>
                <p><strong>Tổng tiền:</strong> ${sanPham.tongTien} VND</p>
                <button class="xoaSanPham" onclick="xoaSanPham(${index})">Xóa</button>
            </div>
        `;
        gioHangDaChon.innerHTML += sanPhamHTML;
    });
}

// Gọi hàm hiển thị sản phẩm khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    hienThiSanPham();
});

let mauGiayChon = ''; // Biến lưu trữ mẫu giày đã chọn
let sizeGiayChon = ''; // Biến lưu trữ size giày đã chọn
let soLuongChon = 0; // Biến lưu trữ số lượng đã chọn

// Hàm kiểm tra xem đã chọn đủ thông tin sản phẩm chưa
function kiemTraThongTin() {
    let mauGiayChon = document.querySelector('.mau img.selected');
    let sizeGiayChon = document.querySelector('.szgiay.selected');
    let soLuongText = document.getElementById('soLuong').textContent;
    let soLuong = parseInt(soLuongText);

    return mauGiayChon && sizeGiayChon && soLuong > 0;
}

// Hàm kiểm tra và hiển thị form mua hàng
function hienThiFormMuaHang() {
    if (kiemTraThongTin()) {
        let formMuaHang = document.getElementById('formMuaHang');
        formMuaHang.style.display = 'block';

        // Hiển thị thông tin sản phẩm đã chọn
        document.getElementById('mauGiayChon').innerText = mauGiayChon;
        document.getElementById('sizeGiayChon').innerText = sizeGiayChon;
        document.getElementById('soLuongChon').innerText = soLuongChon;
    } else {
        alert('Vui lòng chọn đủ mẫu giày, size giày và số lượng trước khi mua hàng.');
    }
}

// Hàm tính tổng tiền của các sản phẩm trong giỏ hàng
function tinhTongTien() {
    let tongTien = 0;

    // Duyệt qua từng sản phẩm trong giỏ hàng và tính tổng tiền
    gioHang.forEach(function(sanPham) {
        tongTien += sanPham.tongTien;
    });

    return tongTien;
}

// Hàm hiển thị tổng tiền của các sản phẩm đã chọn
function hienThiTongTienThanhToan() {
    let tongTien = tinhTongTien();
    let tongTienElement = document.getElementById('tongTienThanhToan');
    tongTienElement.textContent = `Tổng tiền thanh toán: ${tongTien} VND`;
    // Lấy giá trị từ thẻ có id là 'tongTienThanhToan'
    var tongTienThanhToan = document.getElementById('tongTienThanhToan').textContent;

    // Đặt giá trị vào thẻ có id là 'tongTienThanhToanForm'
document.getElementById('tongTienThanhToanForm').textContent = tongTienThanhToan;

}

// Gọi hàm hiển thị tổng tiền thanh toán khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    hienThiTongTienThanhToan();
});
// Hàm kiểm tra xem giỏ hàng có sản phẩm không
function kiemTraGioHangRong() {
    return gioHang.length === 0;
}

// Hàm hiển thị thông báo khi giỏ hàng rỗng và không thể thanh toán
function hienThongBaoGioHangRong() {
    alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
}
// Lắng nghe sự kiện click vào nút "Thanh toán"
document.getElementById('paymentBtn').addEventListener('click', function() {
    if (kiemTraGioHangRong()) {
        // Nếu giỏ hàng rỗng, hiển thị thông báo cảnh báo
        hienThongBaoGioHangRong();
    } else {
        // Nếu không, hiển thị form thanh toán
        var paymentFormContainer = document.getElementById('paymentFormContainer');
        paymentFormContainer.style.display = 'block';
    }
});
// document.getElementById('btnThanhToan').addEventListener('click', function() {
//     document.getElementById('paymentFormContainer').style.display = 'block';
// });

document.getElementById('paymentFormContainer').addEventListener('click', function(event) {
    if (event.target.id === 'paymentFormContainer') {
        document.getElementById('paymentFormContainer').style.display = 'none';
    }
});


// Hàm hiển thị tổng tiền của các sản phẩm đã chọn
function hienThiTongTienThanhToan() {
    let tongTien = tinhTongTien();
    let tongTienElement = document.getElementById('tongTienThanhToan');
    tongTienElement.textContent = `Tổng tiền thanh toán: ${tongTien} VND`;

    // Đặt giá trị vào thẻ 'tongTienThanhToanForm'
    document.getElementById('tongTienThanhToanForm').textContent = `Tổng tiền thanh toán: ${tongTien} VND`;
}
// Hàm thông báo khi thanh toán thành công
function thongBaoThanhToanThanhCong() {
    // Hiển thị thông báo
    alert('Thanh toán thành công!');
}
function kiemTraSoDienThoai(soDienThoai) {
    // Kiểm tra xem chuỗi có chứa ký tự không phải số không
    if (/[^0-9]/.test(soDienThoai)) {
        return false; // Trả về false nếu có ký tự không phải số
    }
    
    // Kiểm tra xem số điện thoại có ít nhất 9 ký tự không
    if (soDienThoai.length < 9) {
        return false; // Trả về false nếu ít nhất 9 ký tự
    }
    
    return true; // Trả về true nếu số điện thoại hợp lệ
}

document.getElementById('submitButton').addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit

    // Lấy giá trị nhập vào từ các trường form
    let paymentName = document.getElementById('paymentName').value.trim();
    let paymentPhone = document.getElementById('paymentPhone').value.trim();
    let paymentAddress = document.getElementById('paymentAddress').value.trim();
    let paymentProducts = document.getElementById('paymentProducts').value.trim();
    
    // Kiểm tra các điều kiện để xác nhận mua hàng thành công
    if (paymentName !== '' && kiemTraSoDienThoai(paymentPhone) && paymentAddress !== '' && paymentProducts !== '') {
        // Hiển thị thông báo mua hàng thành công
        thongBaoThanhToanThanhCong();
        document.getElementById('paymentName').value = '';
        document.getElementById('paymentPhone').value = '';
        document.getElementById('paymentAddress').value = '';
        document.getElementById('paymentProducts').value = '';
        var paymentFormContainer = document.getElementById('paymentFormContainer');
        paymentFormContainer.style.display = 'none';
    } else {
        // Hiển thị thông báo lỗi nếu có trường nào đó không hợp lệ
        alert('Vui lòng nhập đầy đủ thông tin hoặc số điện thoại không hợp lệ!');
    }
});
document.getElementById('closePaymentFormButton').addEventListener('click', function() {
    var paymentFormContainer = document.getElementById('paymentFormContainer');
    paymentFormContainer.style.display = 'none';
});
