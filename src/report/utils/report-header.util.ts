// src/report/utils/report-header.util.ts
export function buildReportHeader(headerData: any, logoBase64: string, fecha: string): string {
  return `
    <div style="width:93%; margin:auto; font-size:10px; padding:5px;">
      <table style="width:93%; margin:0 auto; border-collapse:collapse; font-size:10px;">
        <tr>
          <!-- Columna 1: Logo y Sistema -->
          <td style="width:25%; text-align:center; border:1px solid #333; padding:10px 10px;">
            ${logoBase64 ? `<img src="${logoBase64}" style="width:40px; display:block; margin:0 auto;"/>` : ''}
            <div style="margin-top:2px; font-family: Arial, sans-serif; font-size:8pt;">${headerData.systemName}</div>
          </td>

          <!-- Columna 2: Nombre del reporte -->
          <td style="width:60%; text-align:center; border:1px solid #333; padding:2px; font-weight:bold;
          height:20mm; vertical-align:middle;  font-family: Arial, sans-serif; font-size:14pt;">
            ${headerData.reportName}
          </td>

         <td style="width:20%; text-align:left; border:1px solid #333; padding:2px;">
  <!-- Código -->
  <div style="height:10mm; font-family:Arial; font-size:8pt; display:flex; flex-direction:column; justify-content:center;">
    <div style="font-weight:bold; text-align:left; padding-left:2px; ">Código</div>
    <div style="margin-top:2px; text-align:center">${headerData.reportCode}</div>
  </div>

  <!-- Versión -->
  <div style="height:5mm; font-family:Arial; font-size:8pt; display:flex; align-items:center; justify-content:flex-start; border-top:1px solid #333; margin-top:2px;
  text-align:left; padding-left:2px; ">
    Versión: ${headerData.version}
  </div>

  <!-- Fecha -->
  <div style="height:5mm; font-family:Arial; font-size:8pt; display:flex; align-items:center; justify-content:flex-start; border-top:1px solid #333; margin-top:2px;
  text-align:left; padding-left:2px; ">
    Fecha: ${fecha}
  </div>
</td>

          
       
          
        </tr>
      </table>
    </div>
  `;

    /* <!-- Columna 3: Código, versión y página 
          <td style="width:20%; text-align:center; border:1px solid #333; padding:2px; ">
            <div style="border-bottom:1px solid #333; margin-bottom:2px; font-family:Arial; font-size:8pt; ">Código: ${headerData.reportCode}</div>
            <div style="border-bottom:1px solid #333; margin-bottom:2px; font-family:Arial; font-size:8pt;">Versión: ${headerData.version}</div>
            <div>Página <span class="pageNumber"></span> / <span class="totalPages"></span></div>
          </td>*/

}

export function buildPdfHeader(headerData: any, logoBase64: string, fecha: string) {
  const alturaHeader = 57; // 20 mm ≈ 57 pt
  const separacionTop = 36; // 12.7 mm ≈ 36 pt
  const separacionLateral = 36; // 12.7 mm ≈ 36 pt

  return {
    table: {
      widths: ['*'], // una sola columna contenedor
      body: [
        [
          {
            table: {
              widths: ['25%', '55%', '20%'],
              body: [
                [
                  // Columna 1: Logo y Sistema
                  {
                    stack: [
                      logoBase64
                        ? { image: logoBase64, width: 71, alignment: 'center', margin: [0, 0, 0, 2] } // 25 mm ≈ 71 pt
                        : {},
                      {
                        text: headerData.systemName,
                        font: 'Arial',
                        bold: true,
                        fontSize: 8,
                        alignment: 'center',
                      },
                    ],
                    border: [true, true, true, true], // todos los bordes de la celda
                    alignment: 'center',
                    height: alturaHeader,
                  },

                  // Columna 2: Nombre del reporte
                  {
                    text: headerData.reportName,
                    font: 'Arial',
                    bold: true,
                    fontSize: 14,
                    alignment: 'center',
                    valign: 'middle',      // vertical
                    border: [true, true, true, true],
                    height: alturaHeader,                   
  margin: [0, (alturaHeader - 14) / 2, 0, (alturaHeader - 14) / 2] // centrado vertical

                  },

                  // Columna 3: Código, versión y fecha
                  {
               stack: [
    {
      table: {
        widths: ['*'],
        body: [
          [
            { 
              text: 'Código:', 
              font: 'Arial', 
              fontSize: 8, 
              bold: false,
              alignment: 'left',
              margin: [4, 2, 0, 0],
              border: [false, false, false, false] // sin bordes
            }
          ],
          [
            { 
              text: headerData.reportCode, 
              font: 'Arial', 
              fontSize: 12, 
              bold: true,
              alignment: 'left',
              margin: [4, 0, 0, 2],
              border: [false, false, false, true], // borde inferior SOLAMENTE
              borderColor: '#000000',
              minHeight: 28 // ≈ 10 mm
            }
          ]
        ]
      },
      layout: {
        hLineWidth: () => 1,
        vLineWidth: () => 0,
        hLineColor: () => '#000000',
        paddingLeft: () => 0,
        paddingRight: () => 0,
        paddingTop: () => 0,
        paddingBottom: () => 0
      }
    },
    // Versión
    { 
         table: {
        widths: ['*'],
        body: [
          [
            { 
                 text: `Versión: ${headerData.version}`, 
      font: 'Arial', 
      fontSize: 8, 
      alignment: 'left',
      margin: [4, 4, 0, 2] ,
              border: [false, false, false, true], // línea inferior
              borderColor: '#000000',
              minHeight: 14 // ≈ 5 mm
            }
          ]
        ]
      },
     
   
    },
    // Fecha
    { 
      text: `Fecha: ${fecha}`, 
      font: 'Arial', 
      fontSize: 8, 
      alignment: 'left',
      margin: [4, 2, 0, 2] ,
      minHeight: 14 // ≈ 5 mm
    }
  ],
  border: [true, true, true, true],
  alignment: 'center',
  height: alturaHeader,
                 
                    },
                ],
              ],
            },
            layout: {
              hLineWidth: () => 1,
              vLineWidth: () => 1,
              hLineColor: () => '#000000',
              vLineColor: () => '#000000',
              paddingLeft: () => 0,
              paddingRight: () => 0,
              paddingTop: () => 0,
              paddingBottom: () => 0,
            },
            margin: [separacionLateral, 0, separacionLateral, 0], // 12.7 mm a izquierda/derecha
          },
        ],
      ],
    },
    layout: 'noBorders', // tabla contenedor sin bordes extras
    margin: [0, separacionTop, 0, 10], // margen superior 12.7 mm
  };
};
