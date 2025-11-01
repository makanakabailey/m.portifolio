# Deployment script for portfolio
Write-Host "Adding environment variables..."

# Add MONGODB_URI
$env:MONGODB_URI = "mongodb+srv://Makanaka:7653mac843@cluster0.mebby4n.mongodb.net/portfolio?retryWrites=true&w=majority"
vercel env add MONGODB_URI production --value $env:MONGODB_URI

# Add ADMIN_PIN_HASH  
$env:ADMIN_PIN_HASH = '$2b$12$4uOvi9R0xDby7pxgwXUNiOeBDIkJqRst7qRg4nGlw//NXqw6fBdGm'
vercel env add ADMIN_PIN_HASH production --value $env:ADMIN_PIN_HASH

# Add RESEND_API_KEY
$env:RESEND_API_KEY = "re_JpzRtKns_MoGQyaSJETpNoa8SxQ3Fzwzc"
vercel env add RESEND_API_KEY production --value $env:RESEND_API_KEY

# Add ADMIN_EMAIL
$env:ADMIN_EMAIL = "mkanakabailey@gmail.com"
vercel env add ADMIN_EMAIL production --value $env:ADMIN_EMAIL

Write-Host "Environment variables added. Deploying..."
vercel --prod