// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { LuaRequireProcess } from './process';
import { LuaRequireProvider } from './provider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	const process = new LuaRequireProcess();
    let provider = new LuaRequireProvider(process);
    const LANS = ['lua'];
    for (let lan of LANS) {
        //为对应类型文件添加代码提示
        let providerDisposable = vscode.languages.registerCompletionItemProvider(lan, provider);
        context.subscriptions.push(providerDisposable);
	}
	
	vscode.commands.registerTextEditorCommand('extension.luarequire', (textEditor, edit) => {
		vscode.window.showInformationMessage('Hello World from LuaRequireTool!');
        const doc = textEditor.document;
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
        //获取全部文本区域
        const selection = new vscode.Range(start, end);
        let text = doc.getText(selection);
        //替换文件内容
        textEditor.edit(builder => {
            builder.replace(selection, "123");
        });
	});
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "luarequiretool" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('luarequiretool.helloworld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from LuaRequireTool!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
