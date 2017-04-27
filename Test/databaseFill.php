<?php
/**
 * Created by PhpStorm.
 * User: Arezo
 * Date: 4/14/2017
 * Time: 3:27 PM
 */
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "novintakhlie";
    $ArticleHeadTitle = array("Lolebazkoni", "TakhlieChah", "haffariChah", "TarmimeChah", "LoleKeshi", "TavizeKaseToilet", "RafeNamVaBuyeBad", "BazoBastKardaneDarbeChah"
, "TashkhiseTarkidegiLole", "AyeghKari", "KashiKari", "CementKari", "LoleKeshi", "NasbVaTamireShoofazh", "ServiceCooler", "LoleBazkoni");




if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['submitted'])) {
    // collect value of input field
    $exit = false;
    $headTitle = '';
    $subTitle = '';
    $descriptions = '';
//    echo isset($_GET['HeadTitle']);
    if (empty($_GET['HeadTitle'])) {
        echo "موضوع خالی است";
        echo "<br />";
        $exit = true;
    } else {
        $headTitle = $_GET['HeadTitle'];
    }
    if (empty($_GET['SubTitle'])) {
        echo "عنوان خالی است";
        echo "<br />";
        $exit = true;
    } else {
        $subTitle = $_GET['SubTitle'];
    }
    if (empty($_GET['Descriptions'])) {
        echo "متن مقاله خالی است";
        echo "<br />";
        $exit = true;
    } else {
        $descriptions = $_GET['Descriptions'];
    }
    if (!$exit) {
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
            );
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // prepare sql and bind parameters
            $stmt = $conn->prepare("INSERT INTO `articles` (`ID`, `HeadTitle`, `SubTitle`, `Descriptions`)
 VALUES (NULL, :HeadTitle, :SubTitle, :Descriptions)");
            $stmt->bindParam(':HeadTitle', $HeadTitle);
            $stmt->bindParam(':SubTitle', $SubTitle);
            $stmt->bindParam(':Descriptions', $Descriptions);


            // insert a row
            $HeadTitle = $headTitle;
            $SubTitle = $subTitle;
            $Descriptions = $descriptions;
            $stmt->execute();

            echo "سطر جدید با موفقیت در دیتابیس اضافه شد" . "<br />";
        } catch (PDOException $e) {
            echo "خطا: " . "<br />" . $e->getMessage();
        }
        $conn = null;

    }
}
?>
<meta charset="UTF-8">
<title>
    ویرایش دیتابیس
</title>
<link rel="stylesheet" href="style/style.css">
<link rel="stylesheet" href="style/responsive.css">
<div class="row">
    <div class="pipeEvacuation-col-D-3">

    </div>
    <div class="pipeEvacuation-col-D-6">
        <form method="get" id="updateDbData">
<!--            <input type="text" name="HeadTitle" placeholder="موضوع را وارد کنید...">-->
            <label for="test">موضوع مقاله را انتخاب کنید:</label>
            <br>
            <select name="HeadTitle" id="test" onchange="document.getElementById('text_content').value=this.options[this.selectedIndex].text">
                <option value="Lolebazkoni">لوله بازکنی</option>
                <option value="TakhlieChah">تخلیه چاه</option>
                <option value="haffariChah">حفاری چاه</option>
                <option value="TarmimeChah">ترمیم چاه</option>
                <option value="LoleKeshi">لوله کشی</option>
                <option value="TavizeKaseToilet">تعویض کاسه توالت</option>
                <option value="RafeNamVaBuyeBad">رفع نم و بوی بد</option>
                <option value="BazoBastKardaneDarbeChah">باز و بست کردن درب چاه</option>
                <option value="TashkhiseTarkidegiLole">تشخیص ترکیدگی لوله</option>
                <option value="AyeghKari">عایق کاری</option>
                <option value="KashiKari">کاشی کاری</option>
                <option value="CementKari">سیمان کاری</option>
                <option value="LoleKeshi">لوله کشی</option>
                <option value="NasbVaTamireShoofazh">نصب و تعمیر شوفاژ</option>
                <option value="ServiceCooler">سرویس کولر</option>
            </select>
            <br><br>
            عنوان مقاله:
            <br>
            <input type="text" name="SubTitle" placeholder="عنوان را وارد کنید...">
            <br><br>
            متن مقاله:
            <br>
            <textarea placeholder="متن مقاله را وارد کنید..." name="Descriptions" rows="4" cols="50"></textarea>
            <br><br>
            <input name="submitted" type="submit" value="ثبت اطلاعات">
        </form>
        <input type="hidden" name="articleSelectBox_text" id="text_content" value="" />
    </div>
    <div class="pipeEvacuation-col-D-3">

    </div>

</div>
