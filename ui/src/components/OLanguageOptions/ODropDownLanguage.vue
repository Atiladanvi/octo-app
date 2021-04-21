<template>
  <q-btn dense flat no-wrap>
    <q-icon name="translate" size="24px" />
    <q-icon name="arrow_drop_down" size="16px" style="margin-left: -2px" />
    <q-menu auto-close>
      <q-list dense>
        <q-item>
          <q-item-section>
            <strong>Translations</strong>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item disable clickable>
          <q-item-section>English</q-item-section>
        </q-item>
        <q-item disable clickable>
          <q-item-section>日本語</q-item-section>
        </q-item>
        <q-item disable clickable>
          <q-item-section>简体中文</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section>Help translate</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  name: "DropDownLanguage"
}
</script>
