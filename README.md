# אתר שקט | ייעוץ אקוסטי

אתר סטטי (HTML/CSS/JS בלבד, בלי build step) בנוי מתוכן האתר הישן של עמוס, מוכן לפריסה ב-GitHub Pages.

## מבנה
```
index.html      דף הבית
services.html   9 תחומי השירות
about.html      אודות עמוס והחברה
contact.html    טלפונים, מייל, מפה
css/style.css   עיצוב
js/script.js    תפריט מובייל + ניווט שירותים
images/         תמונות מהאתר הישן (מותאמות ל-webp, קלות משקל)
```

## פריסה ל-GitHub Pages (פעם ראשונה)

1. ב-GitHub, צרו repo חדש (ציבורי), למשל `amos-acoustics-site`. בלי README/gitignore.
2. בטרמינל, בתוך התיקייה הזו:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/amos-acoustics-site.git
   git push -u origin main
   ```
3. ב-GitHub: Settings → Pages → Source: בחרו "Deploy from a branch", branch `main`, folder `/root` → Save.
4. אחרי דקה-שתיים האתר יהיה זמין בכתובת:
   `https://<your-username>.github.io/amos-acoustics-site/`
   זה הלינק לשתף עם עמוס.

## עדכונים בהמשך
כל שינוי בקבצים + `git add . && git commit -m "update" && git push` יעדכן את האתר החי תוך דקה.

## חיבור הדומיין בהמשך
כש-עמוס מאשר, ב-Settings → Pages → Custom domain הזינו את acoustics.co.il, והוסיפו רשומת CNAME אצל ספק הדומיין שמצביעה ל-`<your-username>.github.io`.

## מספר הטלפון הראשי
כרגע כפתור ההתקשרות הראשי בכל האתר הוא **050-651-6518**.
מספרי המשרד הישנים (03/02/08/04/09) מופיעים כקווים אזוריים בעמוד "צור קשר" בלבד.
