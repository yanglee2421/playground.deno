const makeUser32 = () => {
  const user32 = Deno.dlopen("user32.dll", {
    /**
     * 枚举子窗口
     * @param hWnd 父窗口句柄
     * @param lpEnumFunc 回调函数指针
     * @param lParam 传递给回调函数的参数
     * @returns 是否成功
     */
    EnumChildWindows: {
      parameters: ["pointer", "pointer", "isize"],
      result: "bool",
    },

    /**
     * 查找窗口
     * @param lpClassName 窗口类名
     * @param lpWindowName 窗口标题
     * @returns 窗口句柄
     */
    FindWindowW: {
      parameters: ["pointer", "pointer"],
      result: "pointer",
    },

    /**
     * 查找子窗口
     * @param hWndParent 父窗口句柄
     * @param hWndChildAfter 子窗口句柄
     * @param lpszClass 子窗口类名
     * @param lpszWindow 子窗口标题
     * @returns 子窗口句柄
     */
    FindWindowExW: {
      parameters: ["pointer", "pointer", "pointer", "pointer"],
      result: "pointer",
    },

    /**
     * 获取窗口属性
     * @param hWnd 窗口句柄
     * @param nIndex 属性索引
     * @returns 属性值
     */
    GetWindowLongW: {
      parameters: ["pointer", "i32"],
      result: "i32",
    },

    /**
     * 判断窗口是否最小化
     * @param hWnd 窗口句柄
     * @returns 是否最小化
     */
    IsIconic: {
      parameters: ["pointer"],
      result: "bool",
    },

    /**
     * 显示消息框
     * @param hWnd 窗口句柄
     * @param lpText 消息内容
     * @param lpCaption 消息标题
     * @param uType 消息框类型
     * @returns 用户点击的按钮编号
     */
    MessageBoxW: {
      parameters: ["pointer", "pointer", "pointer", "u32"],
      result: "i32",
    },

    /**
     * 显示窗口
     * @param hWnd 窗口句柄
     * @param nCmdShow 显示方式
     * @returns 是否成功
     */
    ShowWindow: {
      parameters: ["pointer", "i32"],
      result: "bool",
    },

    /**
     * 设置窗口为前台窗口
     * @param hWnd 窗口句柄
     * @returns 是否成功
     */
    SetForegroundWindow: {
      parameters: ["pointer"],
      result: "bool",
    },

    /**
     * 发送消息给窗口
     * @param hWnd 窗口句柄
     * @param Msg 消息编号
     * @param wParam 消息参数1
     * @param lParam 消息参数2
     * @returns 消息处理结果
     */
    SendMessageW: {
      parameters: ["pointer", "u32", "usize", "isize"],
      result: "isize",
    },
  });

  return user32;
};

const makeWinConst = () => {
  // Windows 常量
  const winEnum = Object.freeze({
    /**
     * For SendMessageW
     * @description Simulate button click
     */
    BM_CLICK: 0x00f5,

    /**
     * For SendMessageW
     * @description Set check state of a button
     */
    BM_SETCHECK: 0x00f1,

    /**
     * For SendMessageW
     * @description Select string in combo box
     */
    CB_SELECTSTRING: 0x014d,

    /**
     * For GetWindowLongW
     * @description Get control ID
     */
    GWL_ID: -12,

    /**
     * For ShowWindow
     * @description Restore window from minimized state
     */
    SW_RESTORE: 9,

    /**
     * For SendMessageW
     * @description Get button count in toolbar
     */
    TB_BUTTONCOUNT: 0x0418,

    /**
     * For SendMessageW
     * @description Get button info in toolbar
     */
    TB_GETBUTTON: 0x0417,

    /**
     * For SendMessageW
     * @description Simulate button click in toolbar
     */
    TB_PRESSBUTTON: 0x0410,

    /**
     * For SendMessageW
     * @description Close window
     */
    WM_CLOSE: 0x0010,

    /**
     * For SendMessageW
     * @description Set text of a input
     */
    WM_SETTEXT: 0x000c,
  });

  return winEnum;
};

/**
 * String in JavaScript default is UTF-8, but Windows API use UTF-16LE
 * @param str String to convert
 * @returns An UnsafePointer pointing to UTF-16LE encoded string
 */
const stringToPointer = (str: string) => {
  const buf = new Uint16Array(str.length + 1);

  for (let i = 0; i < str.length; ++i) {
    buf[i] = str.charCodeAt(i);
  }

  return Deno.UnsafePointer.of(buf.buffer);
};

// deno run --allow-ffi --allow-unsafe autoInputToVC.ts

export const autoInputToVC = () => {
  const user32 = makeUser32();
  const winEnum = makeWinConst();

  // 枚举子窗口回调
  const enumChildProc = new Deno.UnsafeCallback(
    {
      parameters: ["pointer", "isize"],
      result: "bool",
    },
    (hwnd) => {
      const controlId = user32.symbols.GetWindowLongW(hwnd, winEnum.GWL_ID);
      switch (controlId) {
        case 1304: // 轴型
          user32.symbols.SendMessageW(
            hwnd,
            winEnum.CB_SELECTSTRING,
            BigInt(-1),
            Deno.UnsafePointer.value(stringToPointer("RE2B"))
          );
          break;
        case 1200: // 轴号
          user32.symbols.SendMessageW(
            hwnd,
            winEnum.WM_SETTEXT,
            0n,
            Deno.UnsafePointer.value(stringToPointer("79119"))
          );
          break;
        case 1201: // 制造单位
          user32.symbols.SendMessageW(
            hwnd,
            winEnum.WM_SETTEXT,
            0n,
            Deno.UnsafePointer.value(stringToPointer("112"))
          );
          break;
        case 1202: // 首次组装单位
          user32.symbols.SendMessageW(
            hwnd,
            winEnum.WM_SETTEXT,
            0n,
            Deno.UnsafePointer.value(stringToPointer("112"))
          );
          break;
        case 1203: // 末次组装单位
          user32.symbols.SendMessageW(
            hwnd,
            winEnum.WM_SETTEXT,
            0n,
            Deno.UnsafePointer.value(stringToPointer("112"))
          );
          break;
        case 1204: // 制造日期
          user32.symbols.SendMessageW(
            hwnd,
            winEnum.WM_SETTEXT,
            0n,
            Deno.UnsafePointer.value(stringToPointer("20151112"))
          );
          break;
        case 1205: // 首次组装日期
          user32.symbols.SendMessageW(
            hwnd,
            winEnum.WM_SETTEXT,
            0n,
            Deno.UnsafePointer.value(stringToPointer("20151112"))
          );
          break;
        case 1206: // 末次组装日期
          user32.symbols.SendMessageW(
            hwnd,
            winEnum.WM_SETTEXT,
            0n,
            Deno.UnsafePointer.value(stringToPointer("20151112"))
          );
          break;
        case 1400: {
          // 左轴承
          const ztx = Number("0");
          user32.symbols.SendMessageW(
            hwnd,
            winEnum.BM_SETCHECK,
            BigInt(ztx),
            BigInt(ztx)
          );
          break;
        }
        case 1401: {
          // 右轴承
          const ytx = Number("1");
          user32.symbols.SendMessageW(
            hwnd,
            winEnum.BM_SETCHECK,
            BigInt(ytx),
            BigInt(ytx)
          );
          break;
        }
      }
      return true;
    }
  );

  /**
   * hwnd 窗口句柄 每次窗口创建销毁后句柄会变化
   */
  const appTitle = "信息录入 . 现车轮";
  const hwnd = user32.symbols.FindWindowW(null, stringToPointer(appTitle));

  if (!hwnd) {
    console.error("未打开探伤机程序或配置错误!");
    return;
  }

  user32.symbols.SetForegroundWindow(hwnd);
  user32.symbols.EnumChildWindows(hwnd, enumChildProc.pointer, 0n);
};
