@echo off
echo Antes, executar:
echo ionic cordova plugin rm cordova-plugin-console
echo ionic cordova compile android --device
echo ionic cordova build android --device
echo ionic cordova build android --release
pause
SET  chave=chave20190129
SET  app=Mercado20190129
SET unsigned=app-release-unsigned.apk
echo Chave: %chave%
echo App: %app%
echo Unsigned:%unsigned%
pause
cd "C:\Users\UFRGS\ionic\erick\app_compras\compras\platforms\android\app\build\outputs\apk\release"
"C:\Program Files\Java\jdk-11.0.1\bin\keytool" -genkey -v -keystore %chave%.keystore -alias %app% -keyalg RSA -keysize 2048 -validity 10000
"C:\Program Files\Java\jdk-11.0.1\bin\jarsigner"  -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore %chave%.keystore %unsigned% %app%
C:\Users\UFRGS\AppData\Local\Android\Sdk\build-tools\28.0.3\zipalign -v 4 %unsigned% %app%.apk
%SystemRoot%\explorer.exe "C:\Users\UFRGS\ionic\erick\app_compras\compras\platforms\android\app\build\outputs\apk\release"
pause

