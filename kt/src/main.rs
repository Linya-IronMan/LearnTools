/** 导入依赖库，你只需将其添加到主文件中，应用程序的任何源文件就都可以引用它了 */
extern crate clap;

/** use 部分则是指你将在这个文件中使用 clap 的哪个模块 */
use clap::{App, Arg};
use std::path::Path;
use std::process;
use std::fs::File;
use std::io::{Read};


fn main() {
    let matches = App::new("kt")
        .version("0.1.0")
        .author("Linya")
        .about("用于整理学习资料的命令行")
        .arg(
            Arg::with_name("FILE")
                .help("File to print")
                .empty_values(false),
        )
        .arg(
            Arg::with_name("TEST")
                .help("测试新增参数")
                .empty_values(false),
        )
        .get_matches();

    if let Some(file) = matches.value_of("FILE") {
        println!("Value for file argument: {}", file);
        if Path::new(file).exists() {
            println!("File Exits {}", file);
            let mut f = File::open(file).expect("[kt Error] File not found.");
            let mut data = String::new();
            f.read_to_string(&mut data).expect("[kt Error] Unable to read the file");
            println!("{}", data);
        } else {
            eprintln!("[kt Error] No Such file or directory");
            process::exit(1)
        }
    }

    if let Some(test) = matches.value_of("TEST") {
        print!("WooooooW, TEST, {}", test)
    }
}
