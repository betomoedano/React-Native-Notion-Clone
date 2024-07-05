import { baseClient, extendedClient } from "@/myDbModule";
import { NotionFile } from "@prisma/client/react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { DraggableNotionListItem } from "./DraggableNotionListItem";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Prisma } from "@prisma/client";

export default function DraggableNotionList() {
  const [sortedFiles, setSortedFiles] = useState<NotionFile[]>([]);
  const [orderBy, setOrderBy] =
    useState<Prisma.NotionFileOrderByWithRelationInput>({ order: "asc" });
  const { showActionSheetWithOptions } = useActionSheet();

  const files = extendedClient.notionFile.useFindMany({
    where: { parentFile: { is: null } }, // prevent fetching files that live inside files
    orderBy: orderBy,
  });

  useEffect(() => {
    setSortedFiles(files);
  }, [files, orderBy]);

  const handleActionSheet = () => {
    const options = ["Manual", "Creation Date", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case 0: {
            // Manual
            setOrderBy(() => ({ order: "asc" }));
            break;
          }
          case 1: {
            // Creation Date
            setOrderBy(() => ({ createdAt: "desc" }));
          }
        }
      }
    );
  };

  const handleDragEnd = async (data: NotionFile[]) => {
    setSortedFiles(data);
    const updates = data.map((file, index) => {
      return baseClient.notionFile.update({
        where: { id: file.id },
        data: { order: index },
      });
    });
    await baseClient.$transaction(updates);
    await extendedClient.$refreshSubscriptions();

    // data.forEach((file, index) => {
    //   extendedClient.notionFile.update({
    //     where: { id: file.id },
    //     data: { order: index },
    //   });
    // });
  };

  return (
    <DraggableFlatList
      data={sortedFiles}
      containerStyle={{ flex: 1 }}
      onDragEnd={({ data }) => handleDragEnd(data)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={DraggableNotionListItem}
      ListHeaderComponent={() => (
        <>
          {/* <ResentFiles /> */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 12,
            }}
          >
            <ThemedText style={{ color: "gray" }} type="defaultSemiBold">
              Private Files
            </ThemedText>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={handleActionSheet}
            >
              <Ionicons name="arrow-up" size={15} color="gray" />
              <Ionicons name="arrow-down" size={15} color="gray" />
            </TouchableOpacity>
          </View>
          {!sortedFiles.length && (
            <ThemedText
              style={{ color: "gray", textAlign: "center", paddingTop: 12 }}
              type="default"
            >
              Nothing to show!
            </ThemedText>
          )}
        </>
      )}
    />
  );
}
