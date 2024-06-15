import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Button
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
    username: string;
    verifyCode: string;
}
// TODO : update email template have banner image in mail
const baseUrl = process.env.WEBSITE_DOMAIN
    ? `https://${process.env.WEBSITE_DOMAIN}`
    : "";

export default function MystFeedVerifyEmail({
    verifyCode,
    username,
}: VerificationEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>MystFeed Email Verification</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={coverSection}>
                        <Section style={imageSection}>
                            <Img
                                src={`https://play-lh.googleusercontent.com/ZcYo7MXo6XuUzjbTPOE0Dz6p25QqB6mmkpYn0WNB8odFlVkpHrpozYENhUbFpcrSrGw`}
                                width="150"
                                height="150"
                                alt="Myst Feed Logo"
                            />
                        </Section>
                        <Section style={upperSection}>
                            <Heading style={h1}>Hello {username}</Heading>
                            <Heading style={h3}>
                                Verify your email with MystFeed
                            </Heading>
                            <Text style={mainText}>
                                Welcome to MystFeed! To complete your signup, please
                                use the following verification code within the next
                                60 minutes. This code is your secret pass to the
                                land of trolls!
                            </Text>
                            <Section style={verificationSection}>
                                <Text style={verifyText}>Verification code</Text>
                                <Text style={codeText}>{verifyCode}</Text>
                                <Text style={validityText}>
                                    (This code is valid for 60 minutes)
                                </Text>
                            </Section>
                        </Section>
                        <Section style={centerText}>
                            <Button
                                style={button}
                                href={`${process.env.WEBSITE_DOMAIN}/verify-code/${username}`}
                            >
                                Verify Email
                            </Button>
                        </Section>
                        <Hr />
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                Remember, MystFeed will never ask you to reveal
                                your troll secrets or your favorite memes.
                            </Text>
                        </Section>
                    </Section>
                    <Text style={footerText}>
                        This message is from MystFeed, Inc., 123 Troll Street,
                        Memeville, MY 12345. © 2024, MystFeed, Inc. All rights
                        reserved. Check out our{" "}
                        <Link href="https://mystfeed.com/privacy" target="_blank" style={link}>
                            privacy policy
                        </Link>
                        .
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: "#fff",
    color: "#000",
};

const container = {
    padding: "20px",
    margin: "0 auto",
    backgroundColor: "#eee",
};

const h1 = {
    color: "#000",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
};

const h3 = {
    color: "#000",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "15px",
};

const link = {
    color: "#000",
    fontSize: "14px",
    textDecoration: "underline",
};

const text = {
    color: "#000",
    fontSize: "14px",
    margin: "24px 0",
};
const centerText = {
    textAlign: "center" as const,
    display: "block",
    margin: "32px auto",
};

const button = {
    backgroundColor: "#000000",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "600",
    textDecoration: "none",
    textAlign: "center" as const,
    padding: "30px 20px",
};

const imageSection = {
    backgroundColor: "#000",
    display: "flex",
    padding: "20px 0",
    alignItems: "center",
    justifyContent: "center",
};

const coverSection = {
    backgroundColor: "#fff",
};

const upperSection = {
    padding: "25px 35px",
};

const lowerSection = {
    padding: "25px 35px",
};

const footerText = {
    ...text,
    fontSize: "12px",
    padding: "0 20px",
};

const verifyText = {
    ...text,
    margin: 0,
    fontWeight: "bold",
    textAlign: "center" as const,
};

const codeText = {
    ...text,
    fontWeight: "bold",
    fontSize: "36px",
    margin: "10px 0",
    textAlign: "center" as const,
};

const validityText = {
    ...text,
    margin: "0px",
    textAlign: "center" as const,
};

const verificationSection = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
