export function printReceipt() {
  const receipt = document.getElementById("receipt");
  if (!receipt) return;

  const win = window.open("", "_blank", "width=400,height=600");

  win.document.write(`
    <html>
      <head>
        <title>Receipt</title>
        <style>
          body { font-family: Arial; }
        </style>
      </head>
      <body>
        ${receipt.outerHTML}
        <script>
          window.onload = function() {
            window.print();
            window.close();
          }
        </script>
      </body>
    </html>
  `);

  win.document.close();
}
