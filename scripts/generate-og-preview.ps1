Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630

$bmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)

# High quality rendering
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# Palette
$colorCanvas = [System.Drawing.Color]::FromArgb(245, 242, 234) # #F5F2EA Warm Ivory
$colorOlive = [System.Drawing.Color]::FromArgb(36, 51, 34)      # #243322 Deep Olive
$colorCharcoal = [System.Drawing.Color]::FromArgb(25, 28, 24)   # #191C18 Charcoal
$colorMuted = [System.Drawing.Color]::FromArgb(61, 66, 59)      # #3D423B Charcoal Muted
$colorSubtle = [System.Drawing.Color]::FromArgb(109, 115, 103)  # #6D7367 Subtle
$colorOrange = [System.Drawing.Color]::FromArgb(216, 102, 53)   # #D86635 Burnt Orange

# 1. Fill Background
$brushCanvas = New-Object System.Drawing.SolidBrush($colorCanvas)
$g.FillRectangle($brushCanvas, 0, 0, $width, $height)

# 2. Draw Elegant Inset Frame
$penBorder = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(40, 36, 51, 34), 1.5)
$g.DrawRectangle($penBorder, 32, 32, ($width - 64), ($height - 64))

# Inner fine accent line beside headline
$penAccentBar = New-Object System.Drawing.Pen($colorOrange, 3)
$g.DrawLine($penAccentBar, 80, 205, 80, 355)

# 3. Right-Side Portrait Backdrop Card (Breakout effect matching hero)
$cardX = 730
$cardY = 165
$cardW = 380
$cardH = 400

# Soft card shadow
$shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(22, 25, 28, 24))
$g.FillRectangle($shadowBrush, ($cardX + 8), ($cardY + 8), $cardW, $cardH)

# Olive card background
$cardBrush = New-Object System.Drawing.SolidBrush($colorOlive)
$g.FillRectangle($cardBrush, $cardX, $cardY, $cardW, $cardH)

# Spotlight glow inside card
$spotlightBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(65, 216, 102, 53))
$g.FillEllipse($spotlightBrush, ($cardX + 55), ($cardY + 45), 270, 240)

# Card border
$cardPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 245, 242, 234), 1)
$g.DrawRectangle($cardPen, $cardX, $cardY, $cardW, $cardH)

# 4. Portrait Cutout Image
$cutoutPath = "public/images/abdul-rahman-cutout-trimmed.png"
if (Test-Path $cutoutPath) {
    $cutout = [System.Drawing.Image]::FromFile($cutoutPath)
    
    # Calculate scale so subject fits card with head rising above card top (breakout)
    $targetH = 485
    $targetW = [int]($cutout.Width * ($targetH / $cutout.Height))
    $destX = $cardX + [int](($cardW - $targetW) / 2)
    $destY = $cardY + $cardH - $targetH + 5 # Head rises above $cardY by ~80px
    
    # Clip only the bottom of the card so lower body doesn't bleed past card bottom
    $clipRect = [System.Drawing.Rectangle]::FromLTRB(($cardX - 40), 40, ($cardX + $cardW + 40), ($cardY + $cardH))
    $oldClip = $g.Clip
    $g.SetClip($clipRect)
    
    $g.DrawImage($cutout, $destX, $destY, $targetW, $targetH)
    $g.Clip = $oldClip
    $cutout.Dispose()
}

# 5. Left-Side Typography

# Wordmark / Name
$fontName = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Bold)
$brushOlive = New-Object System.Drawing.SolidBrush($colorOlive)
$brushOrange = New-Object System.Drawing.SolidBrush($colorOrange)
$brushCharcoal = New-Object System.Drawing.SolidBrush($colorCharcoal)
$brushMuted = New-Object System.Drawing.SolidBrush($colorMuted)

$nameText = "Abdul Rahman Baig"
$g.DrawString($nameText, $fontName, $brushOlive, 105, 95)
$nameSize = $g.MeasureString($nameText, $fontName)
$g.FillEllipse($brushOrange, [int](105 + $nameSize.Width - 14), 118, 9, 9)

# Headline Lead
$fontHeadLead = New-Object System.Drawing.Font("Segoe UI", 48, [System.Drawing.FontStyle]::Bold)
$g.DrawString("More presence.", $fontHeadLead, $brushCharcoal, 102, 195)

# Headline Accent (Serif Italic)
$fontHeadAccent = New-Object System.Drawing.Font("Georgia", 50, [System.Drawing.FontStyle]::Italic)
$g.DrawString("Less busywork.", $fontHeadAccent, $brushOlive, 102, 270)

# Service Tags / Pills
$fontServices = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Bold)
$serviceText = "Social Media  ·  Meta Ads  ·  AI Automation"
$g.DrawString($serviceText, $fontServices, $brushOrange, 105, 385)

# Description line
$fontDesc = New-Object System.Drawing.Font("Segoe UI", 14, [System.Drawing.FontStyle]::Regular)
$descText = "Workflow automation with n8n, Meta ad campaigns and customer management."
$g.DrawString($descText, $fontDesc, $brushMuted, 105, 430)

# Bottom Location / Availability Tag
$fontMeta = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Bold)
$brushSubtle = New-Object System.Drawing.SolidBrush($colorSubtle)
$metaText = "AVAILABLE FOR E-COMMERCE BRANDS & CREATORS  ·  KARACHI, PAKISTAN"
$g.DrawString($metaText, $fontMeta, $brushSubtle, 105, 515)

# Output path
$outDir = "public/images"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force
}
$outPath = Join-Path $outDir "og-preview.png"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
Write-Output "Successfully saved social preview image to $outPath"
