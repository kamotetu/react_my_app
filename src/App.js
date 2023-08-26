import './App.css';
import {useState} from 'react';
// 👇 react-quillを使うためのモジュールをimport
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// 👇 fontawesomeの導入はこちらがわかりやすいのだ！ https://qiita.com/stin_dev/items/5755e14805e60718620c
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';

const formats = [
    'code-block',
    'size',
    'div_blot',
];

function CustomIcon () {
    return (
        <FontAwesomeIcon icon={faSquareCheck} />
    );
}

const modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            "addDivBlot": funcAddDivBlot,
        }
    },
};

const BlockEmbed = Quill.import('blots/block/embed');
class DivBlot extends BlockEmbed {
    static create (value) {
        let node = super.create();
        node.style.display = 'flex';
        let img = document.createElement('img');
        img.src = 'https://begien.com/image/BeginnerEngineerBlogTopImage.png';
        img.alt = 'begien.com';
        img.style.width = '50%';
        img.style.height = 'auto';
        node.appendChild(img);
        let span = document.createElement('span');
        span.style.display = 'flex';
        span.style.alignItems = 'center';
        span.innerText = value.text;
        node.appendChild(span);
        return node;
    }
}


DivBlot.blotName = 'div_blot';
DivBlot.tagName = 'div';
DivBlot.className = 'beginner_engineer';

Quill.register(DivBlot, true);

function funcAddDivBlot () {
    const quill = this.quill;
    const selection = quill.getSelection(true);
    let cursor_index = selection.index;
    quill.insertEmbed(cursor_index, 'div_blot', {text: "BeginnerEngineerBlog\nよろしくお願いします。"});
    quill.setSelection(cursor_index + 1);
}

function App() {

    let app_style = {
        margin: '0 auto',
        width: '50%',
        marginTop: '20vh',
    };
    const [value, setValue] = useState('');

    return (
        <div className="App" style={app_style}>
            <div style={{textAlign: 'left'}}>react</div>
            <QuillToolbar
            />
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
            />
        </div>
    );
}

function QuillToolbar (props) {
    return (
        <div id="toolbar" style={{display: 'flex'}}>
            <span className="ql-formats">
                <select className="ql-size" defaultValue="normal">
                    <option value="small"></option>
                    <option value="normal"></option>
                    <option value="large"></option>
                    <option value="huge"></option>
                </select>
            </span>
            <span className="ql-formats">
                <button className="ql-code-block"></button>
            </span>
            <span className="ql-formats">
                <button className="ql-addDivBlot">
                    <CustomIcon />
                </button>
            </span>
        </div>
    );
}

export default App;
