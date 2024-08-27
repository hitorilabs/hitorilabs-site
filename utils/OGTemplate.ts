// og_template.ts
interface OGProps {
    title: string;
    date: Date;
    image: string;
}

interface StyleConfig {
    fontSize: {
        title: string;
        date: string;
        footer: string;
    };
    padding: {
        outer: string;
        inner: string;
    };
    border: {
        width: string;
        color: string;
    };
    boxShadow: {
        offset: string;
        color: string;
    };
    backgroundOpacity: number;
    textColor: string;
    textBackgroundColor: string;
}

const defaultConfig: StyleConfig = {
    fontSize: {
        title: "56px",
        date: "32px",
        footer: "32px",
    },
    padding: {
        outer: "40px",
        inner: "20px",
    },
    border: {
        width: "2px",
        color: "#374151",
    },
    boxShadow: {
        offset: "10px",
        color: "#374151",
    },
    backgroundOpacity: 0.3,
    textColor: "#FFFFFF",
    textBackgroundColor: "rgba(0, 0, 0, 0.7)",
};

export const OGTemplate = (
    { title, date, image }: OGProps,
    config: Partial<StyleConfig> = {}
) => {
    const mergedConfig = { ...defaultConfig, ...config };
    const { fontSize, padding, border, boxShadow, backgroundOpacity, textColor, textBackgroundColor } = mergedConfig;
    const imageURL = `url('data:image/png;base64,${image}')`;
    return {
        type: 'div',
        props: {
            style: {
                height: "100%",
                width: "100%",
                display: "flex",
                backgroundColor: "white",
                backgroundImage:
                    "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
                backgroundSize: "100px 100px",
                fontFamily: "JetBrainsMono-Bold",
            },
            children: {
                type: 'div',
                props: {
                    style: {
                        padding: padding.outer,
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "stretch",
                    },
                    children: {
                        type: 'div',
                        props: {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                border: `${border.width} solid ${border.color}`,
                                boxShadow: `${boxShadow.offset} ${boxShadow.offset} 0px ${boxShadow.color}`,
                                width: "100%",
                                padding: padding.inner,
                                backgroundImage: imageURL,
                                backgroundSize: "contain", // Change this from "cover" to "contain"
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat", // Add this line to prevent image repetition
                                position: "relative",
                            },
                            children: [
                                {
                                    type: 'div',
                                    props: {
                                        style: {
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: `rgba(255, 255, 255, ${1 - backgroundOpacity})`,
                                        },
                                    },
                                },
                                TitleComponent(title, fontSize.title, textColor, textBackgroundColor),
                                FooterComponent(date, fontSize.date, fontSize.footer, textColor, textBackgroundColor),
                            ],
                        },
                    },
                },
            },
        },
    };
};

const TitleComponent = (title: string, fontSize: string, textColor: string, textBackgroundColor: string) => ({
    type: 'div',
    props: {
        style: {
            fontSize,
            fontWeight: "900",
            lineHeight: "1.4",
            padding: "10px",
            color: textColor,
            backgroundColor: textBackgroundColor,
            display: "flex",
            alignItems: "flex-start",
            fontFamily: "JetBrainsMono-Bold",
            position: "relative",
            zIndex: 1,
            maxWidth: "90%",
            borderRadius: "5px",
            alignSelf: "flex-start",
            marginBottom: "auto",
        },
        children: title,
    },
});

const FooterComponent = (date: Date, dateFontSize: string, footerFontSize: string, textColor: string, textBackgroundColor: string) => ({
    type: 'div',
    props: {
        style: {
            fontSize: footerFontSize,
            fontWeight: "900",
            color: textColor,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            backgroundColor: textBackgroundColor,
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
        },
        children: [
            {
                type: 'div',
                props: {
                    style: {
                        fontSize: dateFontSize,
                    },
                    children: date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }),
                },
            },
            {
                type: 'div',
                props: {
                    children: "hitorilabs",
                },
            },
        ],
    },
});
