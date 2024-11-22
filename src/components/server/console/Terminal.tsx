'use client';

import { ITerminalOptions, ITheme, Terminal as XTerminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { useEffect, useRef, useState } from 'react';
import { Ubuntu_Mono } from 'next/font/google';

const font = Ubuntu_Mono({ weight: '400', subsets: ['latin'] });

const theme: ITheme = {
    background: '#484f52',
    cursor: 'transparent',
    black: '#484f52',
    red: '#E54B4B',
    green: '#9ECE58',
    yellow: '#FAED70',
    blue: '#396FE2',
    magenta: '#BB80B3',
    cyan: '#2DDAFD',
    white: '#d0d0d0',
    brightBlack: 'rgba(255, 255, 255, 0.2)',
    brightRed: '#FF5370',
    brightGreen: '#C3E88D',
    brightYellow: '#FFCB6B',
    brightBlue: '#82AAFF',
    brightMagenta: '#C792EA',
    brightCyan: '#89DDFF',
    brightWhite: '#ffffff',
};

const TerminalProps: ITerminalOptions = {
    disableStdin: true,
    cursorStyle: 'underline',
    allowTransparency: true,
    fontSize: 14,
    fontFamily: font.style.fontFamily,
    theme: theme,
    scrollback: 0
}

export default function Terminal({ data }: { data?: string[] }) {
    const ref = useRef<HTMLDivElement>(null);
    const [terminal, setTerminal] = useState<XTerminal | null>(null);
    useEffect(() => {
        const T = new XTerminal(TerminalProps);
        setTerminal(T);

        return () => {
            if (T) {
                T.dispose();
            }
        }
    }, [TerminalProps]);

    useEffect(() => {
        if (terminal) {
            const fitAddon = new FitAddon();
            terminal.loadAddon(fitAddon);
            terminal.open(ref.current!);
            fitAddon.fit();
            terminal.writeln('Welcome to the terminal!');
        }
    }, [terminal]);

    useEffect(() => {
        if (data && data.length > 0) {
            if (terminal) {
                for (const ln of data) {
                    terminal.writeln(ln)
                }
            }
        }
    }, [data, terminal])

    return (
        <div ref={ref} className={'h-full w-full'} />
    )
}