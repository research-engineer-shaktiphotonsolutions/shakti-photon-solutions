Set-Location "d:\Shakti Photon Solutions (SPS)\Cloned Website"

New-Item -ItemType Directory -Force -Path "public/assets/images/team", "public/assets/images/customers" | Out-Null

$assets = @(
  @{section='team'; name='founder-sravani.jpg'; url='https://static.wixstatic.com/media/0aa2fb_ee07784b9d16481fac768f27c285fd16~mv2.jpg/v1/fill/w_731,h_623,al_c,q_85,enc_avif,quality_auto/MD-SPS_edited.jpg'},
  @{section='team'; name='founder-mallikarjuna.jpg'; url='https://static.wixstatic.com/media/0aa2fb_88c02e06398345c892e2b7fdd214d181~mv2.jpg/v1/crop/x_70,y_17,w_1276,h_1092/fill/w_788,h_672,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_20250130_100500_edited.jpg'},
  @{section='team'; name='core-noah.png'; url='https://static.wixstatic.com/media/0aa2fb_118a3df53632441dbe3d43d1c69ca1b3~mv2.png/v1/fill/w_574,h_646,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Noah%20Jacob%20CTO.png'},
  @{section='team'; name='core-jan-nisa.png'; url='https://static.wixstatic.com/media/0aa2fb_0fa555f783f740a19763a3f04971de97~mv2.png/v1/fill/w_574,h_646,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Jannisa%20Quzi%20Leader%20R%26D.png'},
  @{section='team'; name='core-gyan.jpeg'; url='https://static.wixstatic.com/media/0aa2fb_d84de86e57eb4f61861de90c227f22bd~mv2.jpeg/v1/crop/x_602,y_993,w_1808,h_2035/fill/w_574,h_646,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Gyan%20Kumar%20Shaw%20Intern.jpeg'},
  @{section='team'; name='core-gagan.jpg'; url='https://static.wixstatic.com/media/0aa2fb_66252b70aac54001b913651a38ea955e~mv2.jpg/v1/crop/x_148,y_0,w_856,h_963/fill/w_574,h_646,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-03-10%20at%2017_01_edite.jpg'},
  @{section='team'; name='advisor-jagadeesh.png'; url='https://static.wixstatic.com/media/0aa2fb_be3840a24d6a4d18ac2cbbe1be9607b9~mv2.png/v1/fill/w_574,h_646,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/jagadeesh%20kalepu%20(1).png'},
  @{section='team'; name='advisor-siddhartha.jpg'; url='https://static.wixstatic.com/media/0aa2fb_dd9ec3b4401a4416bc2045395a9b28d7~mv2.jpg/v1/fill/w_299,h_336,al_c,lg_1,q_80,enc_avif,quality_auto/siddhartha%20ghosh_edited.jpg'},
  @{section='team'; name='advisor-lokesh.avif'; url='https://static.wixstatic.com/media/0aa2fb_e50bcc1f2d67498e9d41582d14f54b75~mv2.avif/v1/fill/w_443,h_498,al_c,lg_1,q_80,enc_avif,quality_auto/lOKESH%20SIR.avif'},
  @{section='customers'; name='iit-delhi.png'; url='https://static.wixstatic.com/media/0aa2fb_3841c0aa3c3943108f4a90806d32c3f6~mv2.png/v1/fill/w_242,h_242,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IIT_Delhi_logo.png'},
  @{section='customers'; name='nit-warangal.png'; url='https://static.wixstatic.com/media/0aa2fb_92e957920f3749589ec779b5b66172fb~mv2.png/v1/crop/x_0,y_14,w_211,h_211/fill/w_242,h_242,al_c,lg_1,q_85,enc_avif,quality_auto/nitw.png'},
  @{section='customers'; name='rv-college.png'; url='https://static.wixstatic.com/media/0aa2fb_08b93b5b590840c98bc09220b2b8e3c4~mv2.png/v1/fill/w_242,h_242,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/R_V__College_of_Engineering_logo.png'},
  @{section='customers'; name='gitam.jpeg'; url='https://static.wixstatic.com/media/0aa2fb_8b0c15db4d4741b6b576656b55adc36f~mv2.jpeg/v1/fill/w_242,h_242,al_c,lg_1,q_80,enc_avif,quality_auto/Gitam.jpeg'},
  @{section='customers'; name='tifr.png'; url='https://static.wixstatic.com/media/0aa2fb_1808d032ebe1409db3c86e71797521e4~mv2.png/v1/fill/w_242,h_242,al_c,lg_1,q_85,enc_avif,quality_auto/tifr.png'},
  @{section='customers'; name='vit-ap.png'; url='https://static.wixstatic.com/media/0aa2fb_4192e28dda9747f585650212697e3b65~mv2.png/v1/crop/x_0,y_5,w_311,h_311/fill/w_242,h_242,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/VIT-AP_University_seal.png'},
  @{section='customers'; name='uoh.png'; url='https://static.wixstatic.com/media/0aa2fb_2f015f850e50434a9895483ec981576b~mv2.png/v1/crop/x_0,y_1,w_224,h_224/fill/w_242,h_242,al_c,lg_1,q_85,enc_avif,quality_auto/UOH%20Image.png'},
  @{section='customers'; name='iit-hyderabad.png'; url='https://static.wixstatic.com/media/0aa2fb_2c930c3053f644c682e0a70190dffe4e~mv2.png/v1/crop/x_0,y_10,w_215,h_215/fill/w_242,h_242,al_c,lg_1,q_85,enc_avif,quality_auto/IIT%20Hyd.png'},
  @{section='customers'; name='csir-cgcri.png'; url='https://static.wixstatic.com/media/0aa2fb_a1736014d2cb42aebcb7d612a6c3ebf3~mv2.png/v1/fill/w_242,h_242,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/CSIR-Logo-With-Tagline-Seleceted-Bilingual-01.png'},
  @{section='customers'; name='pavakah.png'; url='https://static.wixstatic.com/media/0aa2fb_b9e2fd8833574695a3fb9a59d8f0aaf0~mv2.png/v1/fill/w_280,h_280,al_c,lg_1,q_85,enc_avif,quality_auto/Pavakah%20Energy.png'},
  @{section='customers'; name='aviral.png'; url='https://static.wixstatic.com/media/0aa2fb_6018a434f670491ab910be765d8abd02~mv2.png/v1/crop/x_29,y_2,w_84,h_62/fill/w_118,h_87,al_c,lg_1,q_85,enc_avif,quality_auto/Aviral%20Power.png'},
  @{section='customers'; name='synthetic-gases.jpg'; url='https://static.wixstatic.com/media/0aa2fb_930ebf9de91c44bdaf8913e3545215de~mv2.jpg/v1/crop/x_17,y_0,w_251,h_251/fill/w_320,h_320,al_c,lg_1,q_80,enc_avif,quality_auto/Synthetic%20gases_edited.jpg'}
)

$rows = New-Object System.Collections.Generic.List[object]

foreach ($a in $assets) {
  $out = "public/assets/images/$($a.section)/$($a.name)"
  Invoke-WebRequest -Uri $a.url -OutFile $out
  $rows.Add([pscustomobject]@{
      section = $a.section
      sourceUrl = $a.url
      localPath = "/assets/images/$($a.section)/$($a.name)"
      fileName = $a.name
      referencedFrom = 'src/App.tsx'
      referencedLine = 'new'
    }) | Out-Null
}

$rows | ConvertTo-Json -Depth 3 | Set-Content "public/assets/images/new-pages-manifest.json" -Encoding UTF8
Write-Output "Downloaded $($assets.Count) assets for Team/Customers pages"
