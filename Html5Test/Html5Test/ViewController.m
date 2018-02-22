//
//  ViewController.m
//  Html5Test
//
//  Created by CXDAY-32 on 2018/2/13.
//  Copyright © 2018年 play. All rights reserved.
//

#import "ViewController.h"
#import <WebKit/WebKit.h>
#define ScriptMsg @"ocCallJs"
// https://gabrielecirulli.github.io/2048/
#define GameUrlStr @"http://localhost:7456/build/"
@interface ViewController ()<UIWebViewDelegate>
@property (weak, nonatomic) IBOutlet UIWebView *webView;
@property (weak, nonatomic) IBOutlet WKWebView *wkWebView;
@property (weak, nonatomic) IBOutlet UIButton *sendButton;
@property (weak, nonatomic) IBOutlet UITextField *inputTextField;
@end
@interface ViewController()<WKNavigationDelegate,WKUIDelegate,WKScriptMessageHandler>
@end


@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    self.webView.delegate = self;
    NSBundle * mainBundle = [NSBundle mainBundle];
    NSURL * pathUrl = [mainBundle URLForResource:@"index" withExtension:@"html"];
    NSURL * url = [NSURL URLWithString:GameUrlStr];
    NSURLRequest * request = [NSURLRequest requestWithURL:url];
//    [self.webView loadRequest:request];
    
    
    self.wkWebView.navigationDelegate = self;
    self.wkWebView.UIDelegate = self;
    
    WKPreferences * preference = [WKPreferences new];
    preference.minimumFontSize = 10;
    preference.javaScriptEnabled = YES;
    preference.javaScriptCanOpenWindowsAutomatically = NO;
    self.wkWebView.configuration.preferences = preference;
    
    
    [self.wkWebView.configuration.userContentController addScriptMessageHandler:self name:ScriptMsg];
    [self.wkWebView loadRequest:request];
    // 允許手勢前進後退
    self.wkWebView.allowsBackForwardNavigationGestures = YES;
    
    
}
-(void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
-(void)viewDidDisappear:(BOOL)animated{
    [super viewDidDisappear:animated];
    // 移除與 javascript 的交互對象，避免 memory leak
    [self.wkWebView.configuration.userContentController removeScriptMessageHandlerForName:ScriptMsg];
}
- (IBAction)sendTextButton:(UIButton *)sender {
    NSString * text = self.inputTextField.text;
    
    // 取得 Coco Creator 中 Canvas 中 name 為 ShowLabel 的 Label 並把他的 String 改成 輸入的文字
    NSString * sendScript = [NSString stringWithFormat:@"var showlabel = cc.find(\"Canvas/ShowLabel\").getComponent(cc.Label); \n showlabel.string = '%@'",text];
    [self.wkWebView evaluateJavaScript:sendScript completionHandler:^(id _Nullable result, NSError * _Nullable error) {
        NSLog(@"result : %@, error :%@",result,error.localizedDescription);
    }];
}

#pragma mark - WebView Delegate
// 準備Load
-(BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType{
    
    NSLog(@"UIWebView Load 準備");
    return YES;
}
-(void)webViewDidStartLoad:(UIWebView *)webView{
    
    NSLog(@"UIWebView Load 開始");
}
-(void)webViewDidFinishLoad:(UIWebView *)webView{
    NSLog(@"UIWebView Load 完畢");

}
-(void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error{
    NSLog(@"webView 讀取 Web 失敗：%@",error.localizedDescription);
}
#pragma mark - Wk WebView Delegate
// 準備Load
-(void)webView:(WKWebView *)webView didStartProvisionalNavigation:(WKNavigation *)navigation{
    NSLog(@"WKWebView Load 準備");
}
// 開始 Load
-(void)webView:(WKWebView *)webView didCommitNavigation:(WKNavigation *)navigation{
    NSLog(@"WKWebView Load 開始");
}
// 完成 Load
-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation{
    NSLog(@"WKWebView Load 完畢");
}
// Load 失敗
-(void)webView:(WKWebView *)webView didFailNavigation:(WKNavigation *)navigation withError:(NSError *)error{
    NSLog(@"wkWebView 讀取 Web 失敗：%@",error.localizedDescription);
}
-(void)webView:(WKWebView *)webView didFailProvisionalNavigation:(WKNavigation *)navigation withError:(NSError *)error{
    NSLog(@"wkWebView 讀取 Web 失敗：%@",error.localizedDescription);
}

// 收到請求後跳轉
-(void)webView:(WKWebView *)webView didReceiveServerRedirectForProvisionalNavigation:(WKNavigation *)navigation{
    
}
// 收到請求後，決定是否要跳轉
-(void)webView:(WKWebView *)webView decidePolicyForNavigationResponse:(WKNavigationResponse *)navigationResponse decisionHandler:(void (^)(WKNavigationResponsePolicy))decisionHandler{
    
    decisionHandler(WKNavigationResponsePolicyAllow);
    NSLog(@"WKWebView 收到請求後，決定是否要跳轉");
}
// 收到請求前是否要跳轉
-(void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler{
    // 允許跳轉
    decisionHandler(WKNavigationActionPolicyAllow);
    
    NSLog(@"WKWebView 收到請求前，決定是否要跳轉");
}

#pragma mark - WKWebView UIDelegate
// 建立新的 WkWebView
//-(WKWebView *)webView:(WKWebView *)webView createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration forNavigationAction:(WKNavigationAction *)navigationAction windowFeatures:(WKWindowFeatures *)windowFeatures{
//    if (!navigationAction.targetFrame.isMainFrame) {
//
//    }
//}

/**
 WebView 介面跳出警告視窗時使用
 @param webView 簽Delegate 的 WkWebView
 @param message Alert 的 message
 @param frame 跳出的 Alert Frame 訊息
 @param completionHandler Alert 完成時的動作
 */
-(void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(void))completionHandler{
    
    NSLog(@"WkWebView Alert message : %@",message);
    NSLog(@"WkWebView Alert Frame Info :%@",frame);
    NSLog(@"跳出警告視窗");
//    completionHandler();

    UIAlertController * alert = [UIAlertController alertControllerWithTitle:nil message:message preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction * ok = [UIAlertAction actionWithTitle:@"OK" style:(UIAlertActionStyleDefault) handler:^(UIAlertAction * _Nonnull action) {
        completionHandler();
    }];
    [alert addAction:ok];
    [self presentViewController:alert animated:YES completion:nil];
}

/**
 顯示有輸入框的Alert

 @param webView 簽訂 Delegate 的 WkWebView
 @param prompt Alert Message 訊息
 @param defaultText 文字框輸入的訊息
 @param frame Alert info
 @param completionHandler 完成後要處理的事，一般是傳送輸入的字
 */
-(void)webView:(WKWebView *)webView runJavaScriptTextInputPanelWithPrompt:(NSString *)prompt defaultText:(NSString *)defaultText initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(NSString * _Nullable))completionHandler{
    NSLog(@"Prompt Text : %@",prompt);
    NSLog(@"Default Text : %@",defaultText);
    NSLog(@"Text Input Alert info : %@",frame);
    NSLog(@"跳出輸入框");
    UIAlertController * alert = [UIAlertController alertControllerWithTitle:@"" message:prompt preferredStyle:(UIAlertControllerStyleAlert)];
    [alert addTextFieldWithConfigurationHandler:^(UITextField * _Nonnull textField) {
        
    }];
    UIAlertAction * cancel = [UIAlertAction actionWithTitle:@"Cancel" style:(UIAlertActionStyleCancel) handler:^(UIAlertAction * _Nonnull action) {
        completionHandler(nil);
    }];
    UIAlertAction * ok = [UIAlertAction actionWithTitle:@"OK" style:(UIAlertActionStyleDefault) handler:^(UIAlertAction * _Nonnull action) {
        NSString * text = alert.textFields.firstObject.text;
        completionHandler(text);
    }];
    [alert addAction:cancel];
    [alert addAction:ok];
    [self presentViewController:alert animated:YES completion:nil];
}

/**
 顯示 確認 Alert

 @param webView 簽訂 Delegate 的 WkWebView
 @param message Alert Message 訊息
 @param frame Alert info
 @param completionHandler 完成後要處理的事，一般是確認後得處理
 */
-(void)webView:(WKWebView *)webView runJavaScriptConfirmPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(BOOL))completionHandler{
    NSLog(@"panel message : %@",message);
    NSLog(@"panel Frame Info %@",frame);
    completionHandler(YES);
}
#pragma mark - WKScriptMessageHandler
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message{
    if ([message.name isEqualToString:ScriptMsg]) {
        // do Something
    }
    NSLog(@"取得javaScript 的 send name : %@",message.name);
    NSLog(@"取得javaScript 的 Message : %@",message.body);
}

@end
