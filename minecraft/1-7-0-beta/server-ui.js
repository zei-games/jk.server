import { world } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";

// main shop

export function shopMain(player) {
    const form = new ActionFormData()
        .title('SHOP')
        .body('購入するアイテムのジャンルを選択します')
        .button('§l武器', 'textures/items/diamond_sword')
        .button('§lその他', 'textures/blocks/tnt')
        .show(player).then((response) => {
          if (response.selection == 0) {
            weapon(player)
          }
          if (response.selection == 1) {
            misc(player)
          }
          return;
          });
  }
  
    // normal weapon shop
export function weapon(player) {
      const form = new ActionFormData()
        .title('WEAPON')
        .body('購入するアイテムを選択してください')
        .button('§l石の剣\n§g5金インゴット', 'textures/items/stone_sword')
        .button('§l鉄の剣\n§15ダイヤモンド', 'textures/items/iron_sword')
        .button('§lダイヤモンドの剣\n§25エメラルド', 'textures/items/diamond_sword')
        .button('§l弓\n§15ダイヤモンド', 'textures/items/bow_pulling_0')
        .button('§l４本矢\n§g5金インゴット', 'textures/items/arrow')
        .show(player).then((response) => {
          if (response.selection == 0) {
            player.runCommand("give @s[hasitem={item=gold_ingot,quantity=5..}] stone_sword");
            let CommandResult = player.runCommand("clear @s[hasitem={item=gold_ingot,quantity=5..}] gold_ingot 0 5");
            if (CommandResult.successCount == 0){
              player.sendMessage("§c金インゴットが足りません！");
            };
          }
          if (response.selection == 1) {
            player.runCommand("give @s[hasitem={item=diamond,quantity=5..}] iron_sword");
            let CommandResult = player.runCommand("clear @s[hasitem={item=diamond,quantity=5..}] diamond 0 5");
            if (CommandResult.successCount == 0){
              player.sendMessage("§cダイヤモンドが足りません！");
            };
          }
          if (response.selection == 2) {
            player.runCommand("give @s[hasitem={item=emerald,quantity=5..}] diamond_sword");
            let CommandResult = player.runCommand("clear @s[hasitem={item=emerald,quantity=5..}] emerald 0 5");
            if (CommandResult.successCount == 0){
              player.sendMessage("§cエメラルドが足りません！");
            };
          }
          if (response.selection == 3) {
            player.runCommand("give @s[hasitem={item=diamond,quantity=5..}] bow");
            let CommandResult = player.runCommand("clear @s[hasitem={item=diamond,quantity=5..}] diamond 0 5");
            if (CommandResult.successCount == 0){
              player.sendMessage("§cダイヤモンドが足りません！");
            };
          }
          if (response.selection == 4) {
            player.runCommand("give @s[hasitem={item=gold_ingot,quantity=5..}] arrow 4");
            let CommandResult = player.runCommand("clear @s[hasitem={item=gold_ingot,quantity=5..}] gold_ingot 0 5");
            if (CommandResult.successCount == 0){
              player.sendMessage("§c金インゴットが足りません！");
            };
          }
          return;
      });
  }
  
  //misc shop keeper
  
export function misc(player) {
    const form = new ActionFormData()
      .title('MISC')
      .body('購入するアイテムを選択してください')
      .button('§l石の剣\n§g5金インゴット', 'textures/items/stone_sword')
      .button('§l鉄の剣\n§15ダイヤモンド', 'textures/items/iron_sword')
      .button('§lダイヤモンドの剣\n§25エメラルド', 'textures/items/diamond_sword')
      .show(player).then((response) => {
        if (response.selection == 0) {
          player.runCommand("give @s[hasitem={item=gold_ingot,quantity=5..}] stone_sword");
          let CommandResult = player.runCommand("clear @s[hasitem={item=gold_ingot,quantity=5..}] gold_ingot 0 5");
          if (CommandResult.successCount == 0){
            player.sendMessage("§c金インゴットが足りません！");
          };
        }
        if (response.selection == 1) {
          player.runCommand("give @s[hasitem={item=diamond,quantity=5..}] iron_sword");
          let CommandResult = player.runCommand("clear @s[hasitem={item=diamond,quantity=5..}] diamond 0 5");
          if (CommandResult.successCount == 0){
            player.sendMessage("§cダイヤモンドが足りません！");
          };
        }
        if (response.selection == 2) {
          player.runCommand("give @s[hasitem={item=emerald,quantity=5..}] diamond_sword");
          let CommandResult = player.runCommand("clear @s[hasitem={item=emerald,quantity=5..}] emerald 0 5");
          if (CommandResult.successCount == 0){
            player.sendMessage("§cエメラルドが足りません！");
          };
        }
        return;
    });
  }
  
  // permission settings menu 
export function permission(player) {
    const players = world.getAllPlayers().map(p => p.name)

    const form = new ModalFormData()
    .title('権限管理UI')
    .dropdown('プレイヤーの名前を選択してください。undefindを選択した場合無効になります', 
    players, 0)
    .toggle('備考欄', true) //1
    .toggle('正しいチャットの送信を許可するか', true) //2
    .toggle('ブロックの破壊を許可するか', true) //3
    .toggle('ブロックの設置を許可するか', true) //4
    .toggle('ブロックの使用を許可するか', true) //5
    .toggle('エンティティへの干渉を許可するか', true) //6
    .toggle('アイテムの使用を許可するか（食料等は除く）',true ) //7, 
    .slider('\n権限プリセットを利用する\n\nプリセットを使用した場合は詳細設定は無効化されます\n\n'
    + '0 しない\n2 §l§4違反者§rのプリセットを使用\nスライドさせて変更', 0, 5, 1) //8
    .textField('ニックネーム設定(Beta)削除の可能性が高いです', '対象者のニックネームを入力') // 9
    .toggle('ニックネーム変更を使用する§r', false) //10
    .toggle('これらは開発者向けの設定です\nデバッグ画面を表示する') //11
    .toggle('権限変更を当事者に通知するか', true) //12
    .show(player).then((formData) => {
      if (formData.cancelationReason === "UserBusy") {
          permission(player)
    }
      if (formData.formValues[2] == false) {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' add perm:sendChat')
      }else {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' remove perm:sendChat')
      }
      if (formData.formValues[3] == true) {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' remove perm:breakBlock')
      }else {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' add perm:breakBlock')
      }
      if (formData.formValues[4] == false) {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' add perm:placeBlock')
      }else {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' remove perm:placeBlock')
      }
      if (formData.formValues[5] == false) {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' add perm:useBlock')
      }else {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' remove perm:useBlock')
      }
      if (formData.formValues[6] == false) {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' add perm:useEntity')
      }else {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' remove perm:useEntity')
      }
      if (formData.formValues[7] == false) {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' add perm:useItem')
      }else {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' remove perm:useItem')
      }
      // プリセット
      if (formData.formValues[8] === 2) {
        player.runCommand('tag '+ players[formData.formValues[0]] + ' add perm:placeBlock')
        player.runCommand('tag '+ players[formData.formValues[0]] + ' add perm:breakBlock')
        player.runCommand('tag '+ players[formData.formValues[0]] + ' add perm:sendChat')
        player.runCommand('tag '+ players[formData.formValues[0]] + ' add perm:useEntity')
        player.runCommand('tag '+ players[formData.formValues[0]] + ' rank:acceptor')
      }
      // other

      if (formData.formValues[12] == true) {
        player.runCommand('tellraw '+ players[formData.formValues[0]] + 
        ' {"rawtext":[{"text":"§cあなたは権限が変更されました§r\n開発者向けメッセージ\n' + 
        `${JSON.stringify(formData.formValues, undefined, 2)}` + '\n' + uiResult + '"}]}')
      }
      if (formData.formValues[11] == false) {
        success(player)
    }else {
        debug(player, uiResult)
      }
      
    });
  }
  
// success popup
export function success(player) {
  const form = new MessageFormData()
  .title('権限管理UI メッセージボックス')
  .body('権限の手続きを正常に完了しました。')
  .button1('OK')
  .button2('YES')
  .show(player)
  
}

// debug popup
export function debug(player, results) {
  const form = new MessageFormData()
  .title('デバッグUI メッセージボックス')
  .body('結果は以下の通りになりました\n' + `${JSON.stringify(results, undefined, 2)}`)
  .button1('OK')
  .button2('YES')
  .show(player)
  
} 
