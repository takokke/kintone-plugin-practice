/*
 * 顧客リストの郵便番号、TEL、メールの入力をチェックするサンプルコード
 * Copyright (c) 2024 Cybozu
 *
 * Licensed under the MIT License
 */
interface KintoneEvent {
    record: kintone.types.SavedFields;
}

(() => {
    'use strict';
  
    // 郵便番号のフィールドコード
    const zipFieldCode = '郵便番号';
    // TELのフィールドコード
    const telFieldCode = 'TEL';
    // FAXのフィールドコード
    const faxFieldCode = 'FAX';
    // メールアドレスのフィールドコード
    const mailFieldCode = 'メールアドレス';
  
    // 郵便番号の入力チェック
    const validateZip = (event: KintoneEvent) => {
      // 郵便番号の定義(7桁の半角数字)
      const zipPattern = /^\d{7}$/;
      // eventよりレコード情報を取得します
      const record = event.record;
      // エラーの初期化
      record[zipFieldCode].error = null;
      // 郵便番号が入力されていたら、入力値を確認する
      const zipFieldValue = record[zipFieldCode].value;
      if (zipFieldValue) {
        // 定義したパターンにマッチするか確認する
        if (!(zipFieldValue.match(zipPattern))) {
          // マッチしない場合は、郵便番号フィールドにエラーの内容を表示する
          record[zipFieldCode].error = '郵便番号は7桁の半角数字で入力して下さい。';
        }
      }
    };
  
    // 電話番号の入力チェック
    const validateTel = (event: KintoneEvent) => {
      // TELの定義(10桁または11桁の半角数字)
      const telPattern = /^\d{10,11}$/;
      // eventよりレコード情報を取得する
      const record = event.record;
      // エラーの初期化
      record[telFieldCode].error = null;
  
      // TELが入力されていたら、入力値を確認する
      const telFieldValue = record[telFieldCode].value;
      if (telFieldValue) {
        // 定義したパターンにマッチするか確認する
        if (!(telFieldValue.match(telPattern))) {
          // マッチしない場合は、TELに対してエラーの内容を記載する
          record[telFieldCode].error = '電話番号は10桁 または11桁の半角数字で入力して下さい。';
        }
      }
    };
  
    // FAXの入力チェック
    const validateFax = (event: KintoneEvent) => {
      // FAXの定義(10桁または11桁の半角数字)
      const faxPattern = /^\d{10,11}$/;
      // eventよりレコード情報を取得する
      const record = event.record;
      // エラーの初期化
      record[faxFieldCode].error = null;
      // FAXが入力されていたら、入力値を確認する
      const faxFieldValue = record[faxFieldCode].value;
      if (faxFieldValue) {
        // 定義したパターンにマッチするか確認する
        if (!(faxFieldValue.match(faxPattern))) {
          // マッチしない場合は、FAXに対してエラーの内容を記載する
          record[faxFieldCode].error = 'FAX番号は10桁 または11桁の半角数字で入力して下さい。';
        }
      }
    };
  
    // メールアドレスの入力チェック
    const validateMail = (event: KintoneEvent) => {
      // メールアドレスの定義 (簡易的な定義です。さらに詳細に定義する場合は下記の値を変更して下さい)
      const mailPattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9._-]+)+$/;
      // eventよりレコード情報を取得する
      const record = event.record;
      // エラーの初期化
      record[mailFieldCode].error = null;
      // メールアドレスが入力されていたら、入力値を確認する
      const mailFieldValue = record[mailFieldCode].value;
      if (mailFieldValue) {
        // 定義したパターンにマッチするか確認する
        if (!(mailFieldValue.match(mailPattern))) {
          // マッチしない場合は、メールアドレスに対してエラーの内容を記載する
          record[mailFieldCode].error = 'メールアドレスとして認識されませんでした。値を確認して下さい。';
        }
      }
    };
  
    // 変更イベント（郵便番号)
    kintone.events.on([
      'app.record.create.change.' + zipFieldCode,
      'app.record.edit.change.' + zipFieldCode,
      'app.record.index.edit.change.' + zipFieldCode
    ], (event) => {
      validateZip(event);
      return event;
    });
  
    // 変更イベント(電話番号)
    kintone.events.on([
      'app.record.create.change.' + telFieldCode,
      'app.record.edit.change.' + telFieldCode,
      'app.record.index.edit.change.' + telFieldCode
    ], (event) => {
      validateTel(event);
      return event;
    });
  
    // 変更イベント(FAX)
    kintone.events.on([
      'app.record.create.change.' + faxFieldCode,
      'app.record.edit.change.' + faxFieldCode,
      'app.record.index.edit.change.' + faxFieldCode
    ], (event) => {
      validateFax(event);
      return event;
    });
  
    // 変更イベント(メールアドレス)
    kintone.events.on([
      'app.record.create.change.' + mailFieldCode,
      'app.record.edit.change.' + mailFieldCode,
      'app.record.index.edit.change.' + mailFieldCode
    ], (event) => {
      validateMail(event);
      return event;
    });
  
    // 追加・更新イベント
    kintone.events.on([
      'app.record.create.submit',
      'app.record.edit.submit',
      'app.record.index.edit.submit'
    ], (event) => {
      validateZip(event);
      validateTel(event);
      validateFax(event);
      validateMail(event);
      return event;
    });
  })();