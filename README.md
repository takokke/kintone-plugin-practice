# プラグイン開発の練習

## フォルダ構成
- src
    - dist
    - html
    - css
    - ts
    - image

## デプロイコマンド
```
npx kintone-plugin-uploader plugin.zip --base-url https://ドメイン名.cybozu.com \
--username ユーザー名 \
--password パスワード
```

## 今後やりたいこと
- pdf結合のプラグイン
- 機種依存文字のバリデーションプラグイン

## 注意点
- desktop.tsの最後の行の、``kintone.$PLUGIN_ID``を忘れがち
- アップロードする前に、``kintone-plugin-packer src --ppk 秘密鍵.ppk``でパッケージ化する