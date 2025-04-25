'use strict';

import * as vscode from 'vscode';
import * as crypto from 'crypto';

export function activate(context: vscode.ExtensionContext) {

    console.log('vscode-uuid is now active');
    const commands = [
        { id: 'extension.generateUUID', handler: generateUUID }
    ];
    context.subscriptions.push(
        ...commands.map(cmd =>
            vscode.commands.registerCommand(cmd.id, () => {
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showErrorMessage('No active text editor');
                    return;
                }
                cmd.handler(editor);
            })
        )
    );
}

async function generateUUID(editor: vscode.TextEditor): Promise<void> {

    try {
        await editor.edit(builder => {
            editor.selections.forEach(selection => {
                const uuid = crypto.randomUUID();
                builder.replace(selection, uuid);
            });
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to generate UUID: ${error.message}`);
    }
}

export function deactivate() { }
