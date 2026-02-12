export type RGB = [number, number, number];

export const ColorTheme = {
    primary: [18, 102, 130],
    primaryContainer: [190, 233, 255],
    onPrimary: [255, 255, 255],
    onPrimaryContainer: [0, 77, 100],
    inversePrimary: [139, 208, 239],

    secondary: [77, 97, 108],
    secondaryContainer: [208, 230, 242],
    onSecondary: [255, 255, 255],
    onSecondaryContainer: [53, 74, 83],

    tertiary: [93, 91, 125],
    tertiaryContainer: [227, 223, 255],
    onTertiary: [255, 255, 255],
    onTertiaryContainer: [69, 67, 100],

    error: [186, 26, 26],
    errorContainer: [255, 218, 214],
    onError: [255, 255, 255],
    onErrorContainer: [147, 0, 10],

    background: [246, 250, 253],
    onBackground: [23, 28, 31],
    surface: [246, 250, 253],
    onSurface: [23, 28, 31],
    surfaceVariant: [220, 228, 233],
    onSurfaceVariant: [64, 72, 76],
    inverseSurface: [44, 49, 52],
    inverseOnSurface: [237, 241, 245],

    surfaceDim: [214, 219, 222],
    surfaceBright: [246, 250, 253],
    surfaceContainerLowest: [255, 255, 255],
    surfaceContainerLow: [240, 244, 248],
    surfaceContainer: [234, 238, 242],
    surfaceContainerHigh: [228, 233, 236],
    surfaceContainerHighest: [223, 227, 231],
    surfaceTint: [18, 102, 130],

    primaryFixed: [190, 233, 255],
    primaryFixedDim: [139, 208, 239],
    onPrimaryFixed: [0, 31, 42],
    onPrimaryFixedVariant: [0, 77, 100],
    secondaryFixed: [208, 230, 242],
    secondaryFixedDim: [180, 202, 214],
    onSecondaryFixed: [8, 30, 39],
    onSecondaryFixedVariant: [53, 74, 83],
    tertiaryFixed: [227, 223, 255],
    tertiaryFixedDim: [198, 194, 234],
    onTertiaryFixed: [26, 24, 54],
    onTertiaryFixedVariant: [69, 67, 100],

    outline: [112, 120, 125],
    outlineVariant: [192, 200, 205],
    shadow: [0, 0, 0],
    scrim: [0, 0, 0],

    grass: [0, 255, 38],
    tree: [12, 94, 0],
} satisfies Record<string, RGB>;

export const TextTheme = {
    font: 'Pixelify Sans',
}