import * as React from "react"

import { Background } from "./components/Background"
import { EditorHost } from "./components/EditorHost"
import { MenuContainer } from "./components/Menu"
import StatusBar from "./components/StatusBar"

import { IEditor } from "./../Editor/Editor"
import { keyEventToVimKey } from "./../Input/Keyboard"
import { focusManager } from "./../Services/FocusManager"
import { inputManager } from "./../Services/InputManager"

interface IRootComponentProps {
    fileExplorerEditor: IEditor
    editor: IEditor
}

export class RootComponent extends React.PureComponent<IRootComponentProps, void> {
    public render() {
        return <div className="stack disable-mouse" onKeyDownCapture={(evt) => this._onRootKeyDown(evt)}>
            <div className="stack">
                <Background />
            </div>
            <div className="stack">
                <div className="container vertical full">
                    <div className="container full">
                        <div className="stack">
                            <div className="container horizontal full">
                                <div className="container fixed" style={{width: "250px", height: "100%"}}>
                                    <EditorHost editor={this.props.fileExplorerEditor} />
                                </div>
                                <div className="container full">
                                    <EditorHost editor={this.props.editor} />
                                </div>
                            </div>

                        </div>
                        <div className="stack layer">
                            <MenuContainer />
                        </div>
                    </div>
                    <div className="container fixed layer">
                        <StatusBar />
                    </div>
                </div>
            </div>
        </div>
    }

    private _onRootKeyDown(evt: React.KeyboardEvent<HTMLElement>): void {
        const vimKey = keyEventToVimKey(evt.nativeEvent)
        if (inputManager.handleKey(vimKey)) {
            evt.stopPropagation()
            evt.preventDefault()
        } else {
            focusManager.enforceFocus()
        }
    }
}
