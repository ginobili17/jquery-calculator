$(function() {

  let state = 0;
  $("button").click(function() {

    let pushed = $(this).text();
    if (pushed === "×") {
      pushed = "*";
    } else if (pushed === "÷") {
      pushed = "/"
    }

    let inputLabel = $('#inputLabel');


    if (inputLabel.text() === "+" || inputLabel.text() === "-") {
      if (pushed === "*" || pushed === "/") {
        return
      }
    }
    


    if (pushed === "=") {
      // 末尾が演算記号の時計算しない
      if ($.isNumeric(inputLabel.text().slice(-1))) {
        inputLabel.text(eval(inputLabel.text()));
      } else {
        return
      }      
    } else if (pushed === "clear") {
      // クリアする
      inputLabel.text("0");
      state = 0;

    } else {
      // 最初は×,÷を押せなくする
      if (inputLabel.text() === "0") {
        if (pushed === "*" || pushed === "/") {
          pushed = "0";
        }
        // 演算記号がおされたらstate="calc"で管理
        if (pushed === "+" || pushed === "-" || pushed === "*" || pushed === "/") {
          state = "calc"
          inputLabel.text(pushed);
        } else {
          inputLabel.text(pushed);
          state = 0;
        }
      
        // 演算記号を連続で押せなくする
      } else {
        if(pushed === "+" || pushed === "-" || pushed === "*" || pushed === "/") {
          if (state === "calc") {
            let isCalc = inputLabel.text().slice(0, -1)
            inputLabel.text(isCalc + pushed);
          } else {
            state = "calc";
            inputLabel.text(inputLabel.text() + pushed);
          }
        } else {
          inputLabel.text(inputLabel.text() + pushed);
          state = 0;
        }
      }
    }
  });
});
