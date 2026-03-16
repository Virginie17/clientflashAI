interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
  className?: string
  variant?: 'default' | 'white'
}

export default function Logo({ size = 'medium', showText = true, className = '', variant = 'default' }: LogoProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  }

  const textSizes = {
    small: 'text-sm',
    medium: 'text-xl',
    large: 'text-2xl'
  }

  const isWhite = variant === 'white'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-r ${isWhite ? 'from-white to-gray-200' : 'from-blue-600 to-purple-600'} rounded-lg flex items-center justify-center shadow-lg`}>
        <span className={`${isWhite ? 'text-indigo-600' : 'text-white'} font-bold`}>CF</span>
      </div>
      {showText && (
        <span className={`font-bold ${isWhite ? 'text-white' : 'text-gray-900'} ${textSizes[size]}`}>
          ClientFlash AI
        </span>
      )}
    </div>
  )
}
